const express = require("express");
const router = express.Router();
const {
  getBalance,
  topUpBalance,
  transaction,
  getTransactionHistory,
} = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: 3. Module Transaction
 */
router.get("/balance", authMiddleware, getBalance);
router.post("/topup", authMiddleware, topUpBalance);
router.post("/transaction", authMiddleware, transaction);
router.get("/transaction/history", authMiddleware, getTransactionHistory);

module.exports = router;
