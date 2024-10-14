const {
  createUser,
  getUserByEmail,
  updateProfileUser,
  uploadImageProfile,
} = require("../models/membershipModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registration = async (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 102,
        message: "Format email tidak valid",
        data: null,
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: 102,
        message: "Password harus minimal 8 karakter",
        data: null,
      });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: 102,
        message: "Email sudah terdaftar",
        data: null,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      email,
      first_name,
      last_name,
      password: hashedPassword,
    };

    await createUser(newUser);

    return res.status(200).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 102,
        message: "Parameter email tidak sesuai format",
        data: null,
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: 103,
        message: "Password harus minimal 8 karakter",
        data: null,
      });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: 103,
        message: "Username atau password salah",
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 103,
        message: "Username atau password salah",
        data: null,
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({
      status: 0,
      message: "Login Sukses",
      data: { token },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: user.profile_image,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { email } = req.user;
    const { first_name, last_name } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: 108,
        message: "User tidak ditemukan",
        data: null,
      });
    }

    const updatedData = {
      first_name,
      last_name,
    };

    let updatedUser = await updateProfileUser(email, updatedData);

    return res.status(200).json({
      status: 0,
      message: "Update Profile berhasil",
      data: {
        email: email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        profile_image: updatedUser.profile_image || null,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const { email } = req.user;

    if (!req.file) {
      return res.status(400).json({
        status: 102,
        message: "Format Image tidak sesuai",
        data: null,
      });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: 108,
        message: "User tidak ditemukan",
        data: null,
      });
    }

    const profile_image = `/uploads/profile_images/${req.file.filename}`;

    const updatedData = { profile_image };
    let updatedImageUser = await uploadImageProfile(email, updatedData);

    return res.status(200).json({
      status: 0,
      message: "Update Profile Image berhasil",
      data: {
        email: updatedImageUser.email,
        first_name: updatedImageUser.first_name,
        last_name: updatedImageUser.last_name,
        profile_image: updatedImageUser.profile_image || null,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registration,
  login,
  getUserProfile,
  updateUserProfile,
  updateProfileImage,
};
