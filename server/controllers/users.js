import userModel from "../models/userModel.js";


export const getUsers = async (req, res) => {
  console.log("getting users...");

  try {
    const allUsers = await userModel.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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
