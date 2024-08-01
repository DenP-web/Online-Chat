const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateTokenAndSendCookies = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Validate input data
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Generate profile picture URL based on gender
    const profilePicUrl = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${username}`;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: profilePicUrl,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate token and send cookies
    generateTokenAndSendCookies(newUser._id, res);

    // Send response
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error(`Error in signup controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(404).json({ error: "Invalid username or password" });
    }
    generateTokenAndSendCookies(user._id, res);

    res.status(200).json({
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error(`Error in login controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(`Error in logout controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  login,
  logout,
  signup,
};
