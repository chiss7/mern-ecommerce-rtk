import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY__CLOUD_NAME,
  CLOUDINARY__API_KEY,
  CLOUDINARY__API_SECRET,
} from "../config.js";

cloudinary.config({
  cloud_name: CLOUDINARY__CLOUD_NAME,
  api_key: CLOUDINARY__API_KEY,
  api_secret: CLOUDINARY__API_SECRET,
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "online-shop-app",
  });
};

export const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};
