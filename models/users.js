const { User } = require("./user.model");
const { Conflict } = require("http-errors");

const createUser = async (email, password, subscription) => {
  const user = new User({ email, password, subscription });
  try {
    await user.save();
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      throw new Conflict("User with this email already registered");
    }
    throw error;
  }
  return user;
};

module.exports = {
  createUser,
};
