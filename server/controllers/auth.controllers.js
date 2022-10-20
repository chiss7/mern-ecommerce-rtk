import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { response } from "express";

const signToken = (_id) => jwt.sign({ _id }, SECRET, { expiresIn: "5h" });

export const Auth = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser)
        return res.status(404).json({ message: "User doesn't exists" });
      const isMatch = await bcrypt.compare(password, oldUser.password);
      if (isMatch) {
        const signed = signToken(oldUser._id);
        return res.status(200).json({ result: oldUser, signed });
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  register: async (req, res) => {
    const { email, password, firstName, lastName, isAdmin } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (oldUser)
        return res.status(400).json({ message: "User already exists" });
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(password, salt);
      const user = await User.create({
        name: `${firstName} ${lastName}`,
        email,
        password: hashed,
        isAdmin,
      });
      const signed = signToken(user._id);
      return res.status(201).json({ result: user, signed });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          const salt = await bcrypt.genSalt();
          const hashed = await bcrypt.hash(req.body.password, salt);
          user.password = hashed;
        }
        const updatedUser = await user.save();
        const signed = signToken(updatedUser._id);
        return res.json({ result: updatedUser, signed });
      }
      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
};
