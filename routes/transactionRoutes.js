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

/**
 * @swagger
 * /balance:
 *   get:
 *     description: |
 *       **API Balance Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk mendapatkan informasi balance / saldo terakhir dari User.
 *
 *       **Ketentuan:**
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya.
 *       2. Tidak ada parameter email di query param url ataupun request body; parameter email diambil dari payload JWT yang didapatkan dari hasil login.
 *       3. Handling Response sesuai dokumentasi Response di bawah.
 *     tags: [3. Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get Balance / Saldo Berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Get Balance Berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: integer
 *                       example: 1000000
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: "Token tidak valid atau kadaluwarsa"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.get("/balance", authMiddleware, getBalance);

/**
 * @swagger
 * /topup:
 *   post:
 *     description: |
 *       **API Topup Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk melakukan top up balance / saldo dari User.
 *
 *       **Ketentuan:**
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya.
 *       2. Tidak ada parameter email di query param URL ataupun request body; parameter email diambil dari payload JWT yang didapatkan dari hasil login.
 *       3. Setiap kali melakukan Top Up, maka balance / saldo dari User otomatis bertambah.
 *       4. Parameter **top_up_amount** hanya boleh angka dan tidak boleh lebih kecil dari 0.
 *       5. Pada saat Top Up, set transaction_type di database menjadi **TOPUP**.
 *       6. Handling Response sesuai dokumentasi Response di bawah.
 *     tags: [3. Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               top_up_amount:
 *                 type: integer
 *                 description: Jumlah yang ingin ditambahkan ke saldo
 *                 minimum: 1
 *           example:
 *             top_up_amount: 1000000
 *     responses:
 *       200:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Top Up Balance berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: integer
 *                       example: 1000000
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: "Token tidak valid atau kadaluwarsa"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.post("/topup", authMiddleware, topUpBalance);

/**
 * @swagger
 * /transaction:
 *   post:
 *     description: |
 *       **API Transaction Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk melakukan transaksi dari services / layanan yang tersedia
 *
 *       **Ketentuan:**
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya.
 *       2. Tidak ada parameter email di query param URL ataupun request body; parameter email diambil dari payload JWT yang didapatkan dari hasil login.
 *       3. Setiap kali melakukan Transaksi harus dipastikan balance / saldo mencukupi
 *       4. Pada saat Top Up, set transaction_type di database menjadi **PAYMENT**.
 *       5. Handling Response sesuai dokumentasi Response di bawah.
 *       6. Response **invoice_number** untuk formatnya generate bebas
 *     tags: [3. Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_code:
 *                 type: string
 *                 description: Kode layanan
 *               amount:
 *                 type: integer
 *                 description: Jumlah yang ingin ditransfer
 *           example:
 *             service_code: "PULSA"
 *             amount: 20000
 *     responses:
 *       200:
 *         description: Transaksi Berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Transaksi Berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     invoice_number:
 *                       type: string
 *                       example: "INV17082023-001"
 *                     service_code:
 *                       type: string
 *                       example: "PULSA"
 *                     service_name:
 *                       type: string
 *                       example: "Pulsa"
 *                     transaction_type:
 *                       type: string
 *                       example: "PAYMENT"
 *                     total_amount:
 *                       type: integer
 *                       example: 20000
 *                     created_on:
 *                       type: string
 *                       example: "2022-08-17T11:25:56.000Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: "Service ataus Layanan tidak ditemukan"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: "Token tidak valid atau kadaluwarsa"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.post("/transaction", authMiddleware, transaction);

/**
 * @swagger
 * /transaction/history:
 *   get:
 *     description: |
 *       **API History Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk mendapatkan informasi history transaksi.
 *
 *       **Ketentuan:**
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya.
 *       2. Tidak ada parameter email di query param URL ataupun request body; parameter email diambil dari payload JWT yang didapatkan dari hasil login.
 *       3. Terdapat parameter limit yang bersifat opsional, jika limit tidak dikirim maka tampilkan semua data.
 *       4. Data diurutkan dari yang paling baru berdasarkan transaction date (created_on).
 *       5. Handling Response sesuai dokumentasi Response di bawah.
 *     tags: [3. Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: offset
 *         in: query
 *         description: Offset dari data yang diambil
 *         required: false
 *         schema:
 *           type: integer
 *           example: 0
 *       - name: limit
 *         in: query
 *         description: Jumlah maksimum record yang diambil
 *         required: false
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Get History Transaksi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Get History Berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     offset:
 *                       type: integer
 *                       example: 0
 *                     limit:
 *                       type: integer
 *                       example: 3
 *                     records:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           invoice_number:
 *                             type: string
 *                             example: "INV17082023-001"
 *                           transaction_type:
 *                             type: string
 *                             example: "TOPUP"
 *                           description:
 *                             type: string
 *                             example: "Top Up balance"
 *                           total_amount:
 *                             type: integer
 *                             example: 100000
 *                           created_on:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-08-17T10:10:10.000Z"
 *               example:
 *                 status: 0
 *                 message: "Get History Berhasil"
 *                 data:
 *                   offset: 0
 *                   limit: 3
 *                   records:
 *                     - invoice_number: "INV17082023-001"
 *                       transaction_type: "TOPUP"
 *                       description: "Top Up balance"
 *                       total_amount: 100000
 *                       created_on: "2023-08-17T10:10:10.000Z"
 *                     - invoice_number: "INV17082023-002"
 *                       transaction_type: "PAYMENT"
 *                       description: "PLN Pascabayar"
 *                       total_amount: 10000
 *                       created_on: "2023-08-17T11:10:10.000Z"
 *                     - invoice_number: "INV17082023-003"
 *                       transaction_type: "PAYMENT"
 *                       description: "Pulsa Indosat"
 *                       total_amount: 40000
 *                       created_on: "2023-08-17T12:10:10.000Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: "Token tidak valid atau kadaluwarsa"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.get("/transaction/history", authMiddleware, getTransactionHistory);

module.exports = router;
