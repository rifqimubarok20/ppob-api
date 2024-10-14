const pool = require("../config/db");

const banners = async () => {
  try {
    const query = `SELECT banner_name, banner_image, description FROM banners;`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching banners", error);
    throw error;
  }
};

const services = async () => {
  try {
    const query = `SELECT service_code, service_name, service_icon, service_tarif FROM services;`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching services", error);
    throw error;
  }
};

module.exports = {
  banners,
  services,
};
