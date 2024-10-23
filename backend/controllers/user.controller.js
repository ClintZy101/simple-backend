import mongoose from "mongoose";
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  const user = req.body;

  if (!user.first_name || !user.last_name || !user.email) {
    return res.status(400).json({
      success: false,
      message: "Please provide the necessary fields.",
    });
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log("Error in Create Product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(`error in fetching all  products:`, error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Id, try again" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res
      .status(200)
      .json({
        success: true,
        message: "user updated successfully",
        data: updatedUser,
      });
  } catch (error) {
    console.log("error in updating user:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const deleteUser = async (req,res) => {
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: 'invalid id'})
    }
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({success:true, message:"deleted user successfully"})
    } catch (error) {
        console.log(`error in deleting user:`, error.message)
        res.status(500).json({success:false, message:"server error"})
    }
}
