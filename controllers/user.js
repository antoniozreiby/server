import User from "../models/User.js";

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

// Get single user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    // Map the _id to id
    const userResponse = {
      id: user._id.toString(), // Map _id to id as a string
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      routines: user.routines,
      entries: user.entries,
      meals: user.meals,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.status(200).json(userResponse); // Send mapped userResponse, not user
  } catch (err) {
    next(err);
  }
};

// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    // Map each user to include id as a virtual or mapped field
    const usersResponse = users.map((user) => ({
      id: user._id.toString(), // Map _id to id for all users
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      routines: user.routines,
      entries: user.entries,
      meals: user.meals,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
    res.status(200).json(usersResponse);
  } catch (err) {
    next(err);
  }
};
