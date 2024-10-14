const pool = require("../config/db");

const createUser = async (user) => {
  const { email, first_name, last_name, password } = user;
  try {
    const query = `
        INSERT INTO users (email, first_name, last_name, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, first_name, last_name;
      `;
    const values = [email, first_name, last_name, password];
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error("Error creating user", error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const query = `
      SELECT id, email, password, first_name, last_name, profile_image FROM users WHERE email = $1;
    `;
    const values = [email];
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user by email", error);
    throw error;
  }
};

const updateProfileUser = async (email, user) => {
  const { first_name, last_name } = user;
  try {
    const query = `
        UPDATE users 
        SET first_name = $1, last_name = $2
        WHERE email = $3
        RETURNING id, email, first_name, last_name, profile_image;
      `;
    const values = [first_name, last_name, email];
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};

const uploadImageProfile = async (email, image) => {
  const { profile_image } = image;

  try {
    const query = `
        UPDATE users 
        SET profile_image = $1
        WHERE email = $2
        RETURNING id, email, first_name, last_name, profile_image;
      `;
    const values = [profile_image, email];
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  updateProfileUser,
  uploadImageProfile,
};
