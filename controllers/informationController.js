const { banners, services } = require("../models/informationModel");

const getBanners = async (req, res) => {
  try {
    const result = await banners();
    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const result = await services();
    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBanners,
  getServices,
};
