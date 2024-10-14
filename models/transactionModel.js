const pool = require("../config/db");

const getBalanceByUser = async (email) => {
  try {
    const query = `SELECT balance FROM balances WHERE email = $1;`;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching balance by user", error);
    throw error;
  }
};

const createBalance = async (email, balance) => {
  try {
    const query = `INSERT INTO balances (email, balance) VALUES ($1, $2) RETURNING *;`;
    const values = [email, balance];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating balance", error);
    throw error;
  }
};

const updateTopUpBalance = async (amount, email) => {
  try {
    const query = `UPDATE balances SET balance = balance + $1 WHERE email = $2;`;
    const values = [amount, email];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating balance", error);
    throw error;
  }
};

const createTransaction = async (email, amount) => {
  const {
    invoice_number,
    service_code,
    service_name,
    transaction_type,
    total_amount,
    created_on,
  } = amount;
  try {
    const query = `INSERT INTO transactions (email, invoice_number, service_code, service_name, transaction_type, total_amount, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
    const values = [
      email,
      invoice_number,
      service_code,
      service_name,
      transaction_type,
      total_amount,
      created_on,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error Transaction", error);
    throw error;
  }
};

const updateBalanceAfterTransaction = async (amount, email) => {
  try {
    const query = `UPDATE balances SET balance = balance - $1 WHERE email = $2;`;
    const values = [amount, email];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating balance", error);
    throw error;
  }
};

const getTransactionHistoryByUser = async (email, limit) => {
  try {
    const query = `
        SELECT * 
        FROM transactions 
        WHERE email = $1 
        ORDER BY created_on DESC
        ${limit ? "LIMIT $2" : ""}`;

    const values = limit ? [email, limit] : [email];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching transactions by user", error);
    throw error;
  }
};

module.exports = {
  getBalanceByUser,
  createBalance,
  updateTopUpBalance,
  createTransaction,
  updateBalanceAfterTransaction,
  getTransactionHistoryByUser,
};
