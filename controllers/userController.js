const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { generateHash, compareHash } = require("../config/bcrypt");
const { generateToken } = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, isFarmer } = req.body;

  if (!email || !password ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400);
      throw new Error("User already exists");
    }

    const newUser = new User({
      email,
      password: generateHash(password),
      role: (isFarmer ? "farmer" : "wholeseller"),
    });

    const createdUser = await newUser.save();
    res.status(201).json({
        _id: createdUser._id,
        email: createdUser.email,
        role: createdUser.role,
        token: generateToken(createdUser._id),
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400);
            throw new Error("Invalid Credentials");
        }

        const isMatch = compareHash(password, user.password);
        if (!isMatch) {
            res.status(400);
            throw new Error("Invalid Credentials");
        }

        res.status(200).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            userInfo: user.userInfo,
            token: generateToken(user._id),
        })
    } catch (err) {
        res.status(500);
        throw new Error(err.message);
    }
})

module.exports = { registerUser, loginUser };