import userModel from "../models/userModel.js";

export const createUser = async (req, res) => {
  console.log("making user...");
  const { user } = req.body;
  console.log(user);
  const newUser = userModel({
    user
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
