import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied. Not authenticated" });
    let decodedData;
    decodedData = jwt.verify(token, SECRET);
    req.userId = decodedData?._id;
    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ message: "Access denied. Invalid auth token" });
  }
};

export const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied. Not authorized" });
    }
  });
};
