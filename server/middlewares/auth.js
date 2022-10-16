import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, SECRET);
      req.userId = decodedData?._id;
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default auth;
