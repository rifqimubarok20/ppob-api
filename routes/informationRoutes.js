const express = require("express");
const router = express.Router();
const {
  getBanners,
  getServices,
} = require("../controllers/informationController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: 2. Module Information
 */

/**
 * @swagger
 * /information/banner:
 *   get:
 *     description: |
 *       **API Banner Public (tidak memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk mendapatkan list banner
 *
 *       **Ketentuan:**
 *       1. Buat data list banner sesuai dokumentasi Response dibawah, usahakan banner ini tidak di hardcode, melainkan ambil dari database
 *       2. Tidak perlu membuatkan module CRUD banner
 *       3. Handling Response sesuai dokumentasi Response dibawah
 *     tags: [2. Module Information]
 *     security:
 *       - bearerAuth: []
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
 *                   example: "Sukses"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       banner_name:
 *                         type: string
 *                         example: "Banner 1"
 *                       banner_image:
 *                         type: string
 *                         example: "https://nutech-integrasi.app/banner1.jpg"
 *                       description:
 *                         type: string
 *                         example: "Lorem Ipsum Dolor sit amet"
 *             example:
 *               status: 0
 *               message: "Sukses"
 *               data:
 *                 - banner_name: "Banner 1"
 *                   banner_image: "https://nutech-integrasi.app/banner1.jpg"
 *                   description: "Lorem Ipsum Dolor sit amet"
 *                 - banner_name: "Banner 2"
 *                   banner_image: "https://nutech-integrasi.app/banner2.jpg"
 *                   description: "Lorem Ipsum Dolor sit amet"
 *                 - banner_name: "Banner 3"
 *                   banner_image: "https://nutech-integrasi.app/banner3.jpg"
 *                   description: "Lorem Ipsum Dolor sit amet"
 *                 - banner_name: "Banner 4"
 *                   banner_image: "https://nutech-integrasi.app/banner4.jpg"
 *                   description: "Lorem Ipsum Dolor sit amet"
 *                 - banner_name: "Banner 5"
 *                   banner_image: "https://nutech-integrasi.app/banner5.jpg"
 *                   description: "Lorem Ipsum Dolor sit amet"
 *                 - banner_name: "Banner 6"
 *                   banner_image: "https://nutech-integrasi.app/banner6.jpg"
 *                   description: "Lorem Ipsum Dolor sit amet"
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
 *                   example: "Token tidak tidak valid atau kadaluwarsa"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.get("/information/banner", authMiddleware, getBanners);

/**
 * @swagger
 * /information/services:
 *   get:
 *     description: |
 *       **API Services Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk mendapatkan list Service/Layanan PPOB.
 *
 *       **Ketentuan:**
 *       1. Buat data list Service/Layanan sesuai dokumentasi Response di bawah. Usahakan data list **Service** atau **Layanan** ini tidak di-hardcode, melainkan ambil dari database.
 *       2. Tidak perlu membuatkan module CRUD untuk banner.
 *       3. Handling Response sesuai dokumentasi Response di bawah.
 *     tags: [2. Module Information]
 *     security:
 *       - bearerAuth: []
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
 *                   example: "Sukses"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       service_code:
 *                         type: string
 *                         example: "PAJAK"
 *                       service_name:
 *                         type: string
 *                         example: "Pajak PBB"
 *                       service_icon:
 *                         type: string
 *                         example: "https://nutech-integrasi.app/dummy.jpg"
 *                       service_tariff:
 *                         type: integer
 *                         example: 40000
 *             example:
 *               status: 0
 *               message: "Sukses"
 *               data:
 *                 - service_code: "PAJAK"
 *                   service_name: "Pajak PBB"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 40000
 *                 - service_code: "PLN"
 *                   service_name: "Listrik"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 10000
 *                 - service_code: "PDAM"
 *                   service_name: "PDAM Berlangganan"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 40000
 *                 - service_code: "PULSA"
 *                   service_name: "Pulsa"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 40000
 *                 - service_code: "PGN"
 *                   service_name: "PGN Berlangganan"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 50000
 *                 - service_code: "MUSIK"
 *                   service_name: "Musik Berlangganan"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 50000
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
router.get("/information/services", authMiddleware, getServices);

module.exports = router;
