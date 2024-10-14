const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  getUserProfile,
  updateUserProfile,
  updateProfileImage,
} = require("../controllers/membershipController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

/**
 * @swagger
 * tags:
 *   name: 1. Module Membership
 */

/**
 * @swagger
 * /registration:
 *   post:
 *     description: |
 *       **API Login Public (Tidak perlu Token untuk mengaksesnya)**
 *
 *       Digunakan untuk melakukan registrasi User agar bisa Login ke dalam aplikasi.
 *
 *       **Ketentuan:**
 *       1. Parameter request **email** harus terdapat validasi format email.
 *       2. Parameter request **password** minimal 8 karakter.
 *       3. Handling Response sesuai dokumentasi Response di bawah.
 *     tags: [1. Module Membership]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email yang digunakan untuk registrasi
 *               first_name:
 *                 type: string
 *                 description: Nama depan pengguna
 *               last_name:
 *                 type: string
 *                 description: Nama belakang pengguna
 *               password:
 *                 type: string
 *                 description: Password minimal 8 karakter
 *           example:
 *             email: "rifqi@gmail.com"
 *             first_name: "Rifqi"
 *             last_name: "Mubarok"
 *             password: "password123"
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
 *                   example: "Registrasi berhasil silahkan login"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
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
 *                   example: "Paramter email tidak sesuai format"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.post("/registration", registration);

/**
 * @swagger
 * /login:
 *   post:
 *     description: |
 *       **API Login Public (Tidak perlu Token untuk mengaksesnya)**
 *
 *       Digunakan untuk melakukan login dan mendapatkan authentication berupa JWT (Json Web Token)
 *
 *       **Ketentuan:**
 *       1. Parameter request **email** harus terdapat validasi format email
 *       2. Parameter request **password** minimal 8 karakter.
 *       3. **JWT** yang digenerate harus memuat payload email dan di set expiration selama 12 jam dari waktu di generate
 *       4. Handling Response sesuai dokumentasi Response di bawah.
 *     tags: [1. Module Membership]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email yang digunakan untuk registrasi
 *               password:
 *                 type: string
 *                 description: Password minimal 8 karakter
 *           example:
 *             email: "rifqi@gmail.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: Berhasil Login
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
 *                   example: "Login Sukses"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiUmliZSIsImV4cCI6MTY0MDU0NTI1MiwiaWF0IjoxNjQwNTQ1MjUyfQ.7fUHhXp2b0n6bY1XsG3xXoD6zqTz9V9q9j"
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
 *                   example: "Paramter email tidak sesuai format"
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
 *                   example: 103
 *                 message:
 *                   type: string
 *                   example: "Username atau password salah"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.post("/login", login);

/**
 * @swagger
 * /profile:
 *   get:
 *     description: |
 *       **API Profile Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk mendapatkan informasi profile User
 *
 *       **Ketentuan:**
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya
 *       2. Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
 *       3. Handling Response sesuai dokumentasi Response di bawah.
 *     tags: [1. Module Membership]
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
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "rifqi@gmail.com"
 *                     first_name:
 *                       type: string
 *                       example: "Rifqi"
 *                     last_name:
 *                       type: string
 *                       example: "Mubarok"
 *                     profile_image:
 *                       type: string
 *                       example: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
router.get("/profile", authMiddleware, getUserProfile);

/**
 * @swagger
 * /update/profile:
 *   put:
 *     description: |
 *       **API Update Profile Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk mendapatkan informasi profile User
 *
 *       **Ketentuan:**
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya
 *       2. Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
 *       3. Handling Response sesuai dokumentasi Response di bawah.
 *     tags: [1. Module Membership]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Nama depan pengguna
 *               last_name:
 *                 type: string
 *                 description: Nama belakang pengguna
 *           example:
 *             first_name: "Rifqi Edit"
 *             last_name: "Mubarok Edit"
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
 *                   example: "Update Pofile berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "rifqi@gmail.com"
 *                     first_name:
 *                       type: string
 *                       example: "Rifqi Edit"
 *                     last_name:
 *                       type: string
 *                       example: "Mubarok Edit"
 *                     profile_image:
 *                       type: string
 *                       example: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
router.put("/profile/update", authMiddleware, updateUserProfile);

/**
 * @swagger
 * /update/image:
 *   put:
 *     description: |
 *       **API Upload Profile Image Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk mendapatkan informasi profile User
 *
 *       **Ketentuan:**
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya
 *       2. Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
 *       3. Format Image yang boleh di upload hanya **jpeg** dan **png**
 *       4. Handling Response sesuai dokumentasi Response di bawah.
 *     tags: [1. Module Membership]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
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
 *                   example: "Update Pofile Image berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "rifqi@gmail.com"
 *                     first_name:
 *                       type: string
 *                       example: "Rifqi Edit"
 *                     last_name:
 *                       type: string
 *                       example: "Mubarok Edit"
 *                     profile_image:
 *                       type: string
 *                       example: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
 *                   example: "Format Image tidak sesuai"
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
 *                   example: "Token tidak tidak valid atau kadaluwarsa"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.put(
  "/profile/image",
  authMiddleware,
  upload.single("profile_image"),
  updateProfileImage
);
module.exports = router;
