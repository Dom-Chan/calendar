import userModel from "../models/userModel.js";

export const createUser = async (req, res) => {
    console.log('making user...')
    const { username, name, events } = req.body;
   
    const newUser = userModel({
      username,
      name,
      events
    });
  
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };