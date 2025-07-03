import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
