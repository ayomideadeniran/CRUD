import User from "../model/usermodel.js";

export const create = async (req, res) => {
  try {
    const { author } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ author });
    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    // If user does not exist, create a new user
    const userData = new User(req.body);
    const savedUser = await userData.save();

    // Send response after saving user
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const fetch = async (req, res) => {
  try {
    // return res.json("Hello world");
    const user = await User.find();
    if (user.length === 0) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  // so this line i printing the updated user along side a message
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    const usersExist = await User.findById({ _id: id });
    if (!usersExist) {
      return res.status(404).json({ error: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully", user: usersExist });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

