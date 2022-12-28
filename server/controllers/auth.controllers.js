import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { FROM, SECRET } from "../config.js";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { sendMail, verifyAccountTemplate } from "../utils.js";

const signToken = (_id, isAdmin, code) =>
  jwt.sign({ _id, isAdmin, code }, SECRET, { expiresIn: "5h" });

export const Auth = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser)
        return res.status(404).json({ message: "User doesn't exists" });
      const isMatch = await bcrypt.compare(password, oldUser.password);
      if (isMatch) {
        const signed = signToken(oldUser._id, oldUser.isAdmin, oldUser.code);
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
      const code = uuidv4();
      const user = await User.create({
        name: `${firstName} ${lastName}`,
        email,
        password: hashed,
        isAdmin,
        code,
      });
      const signed = signToken(user._id, user.isAdmin, user.code);

      // send email
      const msg = {
        to: user.email,
        from: FROM,
        subject: "Please verify your account",
        html: verifyAccountTemplate(user.name, user.code),
      };
      sendMail(msg);

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
        const signed = signToken(updatedUser._id, updatedUser.isAdmin, updatedUser.code);
        return res.json({ result: updatedUser, signed });
      }
      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  getStats: async (req, res) => {
    const previousMonth = moment()
      .month(moment().month() - 1)
      .set("date", 1)
      .format("YYYY-MM-DD HH:mm:ss");
    try {
      const users = await User.aggregate([
        {
          $match: { createdAt: { $gte: new Date(previousMonth) } },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      return res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      if (!users)
        return res.status(404).json({ message: "There is no user yet" });
      res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
};
