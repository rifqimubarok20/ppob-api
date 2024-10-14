const {
  getBalanceByUser,
  createBalance,
  updateTopUpBalance,
  createTransaction,
  updateBalanceAfterTransaction,
  getTransactionHistoryByUser,
} = require("../models/transactionModel");

const getBalance = async (req, res) => {
  const { email } = req.user;
  try {
    const balance = await getBalanceByUser(email);
    if (!balance) {
      return res.status(404).json({ message: "Balance tidak ditemukan" });
    }
    res.status(200).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: {
        balance: balance.balance,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const topUpBalance = async (req, res) => {
  const { top_up_amount } = req.body;
  const { email } = req.user;

  try {
    const balance = await getBalanceByUser(email);
    if (
      !top_up_amount ||
      typeof top_up_amount !== "number" ||
      top_up_amount <= 0
    ) {
      return res.status(400).json({
        status: 102,
        message:
          "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
        data: null,
      });
    }

    const dataTopUp = {
      email: email,
      invoice_number: generateInvoiceNumber(),
      service_code: "TOPUP",
      service_name: "Top Up Balance",
      transaction_type: "TOPUP",
      total_amount: top_up_amount,
      created_on: new Date(),
    };

    const topup = await createTransaction(email, dataTopUp);

    if (topup) {
      if (!balance) {
        await createBalance(email, topup.total_amount);
      } else {
        await updateTopUpBalance(topup.total_amount, email);
      }
    }

    res.status(200).json({
      status: 0,
      message: "Top Up Balance Berhasil",
      data: {
        balance: topup.total_amount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateInvoiceNumber = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const datePart = `${day}${month}${year}`;

  const randomSequence = String(Math.floor(100 + Math.random() * 900));

  return `INV${datePart}-${randomSequence}`;
};

const transaction = async (req, res) => {
  const { service_code, amount } = req.body;
  const { email } = req.user;

  try {
    const dataTransaction = {
      email: email,
      invoice_number: generateInvoiceNumber(),
      service_code: service_code,
      service_name: service_code,
      transaction_type: "PAYMENT",
      total_amount: amount,
      created_on: new Date(),
    };

    const topup = await createTransaction(email, dataTransaction);

    if (topup) {
      await updateBalanceAfterTransaction(topup.total_amount, email);
    }

    res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
      data: {
        invoice_number: topup.invoice_number,
        service_code: topup.service_code,
        service_name: topup.service_name,
        transaction_type: topup.transaction_type,
        total_amount: topup.total_amount,
        created_on: topup.created_on,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactionHistory = async (req, res) => {
  const { email } = req.user;
  const { limit } = req.query;

  try {
    let limitValue = parseInt(limit);
    if (limit && (isNaN(limitValue) || limitValue <= 0)) {
      return res.status(400).json({
        status: 102,
        message: "Parameter limit harus berupa angka positif",
        data: null,
      });
    }

    const transactions = await getTransactionHistoryByUser(email, limitValue);

    if (!transactions.length) {
      return res.status(404).json({ message: "Transactions Tidak Ditemukan" });
    }

    const formattedTransactions = transactions.map((transaction) => ({
      invoice_number: transaction.invoice_number,
      transaction_type: transaction.transaction_type,
      description: transaction.description,
      total_amount: transaction.total_amount,
      created_on: transaction.created_on,
    }));

    res.status(200).json({
      status: 0,
      message: "Get Transactions Berhasil",
      data: {
        offset: 0,
        limit: limitValue || formattedTransactions.length,
        records: formattedTransactions,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBalance,
  topUpBalance,
  generateInvoiceNumber,
  transaction,
  getTransactionHistory,
};
