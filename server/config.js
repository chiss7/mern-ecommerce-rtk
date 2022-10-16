import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;

export const MONGODB_URI = process.env.MONGODB_URI;

export const CLOUDINARY__CLOUD_NAME = process.env.CLOUDINARY__CLOUD_NAME;
export const CLOUDINARY__API_KEY = process.env.CLOUDINARY__API_KEY;
export const CLOUDINARY__API_SECRET = process.env.CLOUDINARY__API_SECRET;

export const SECRET = process.env.SECRET;

export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
export const PAYPAL_API = process.env.PAYPAL_API;

export const HOST = process.env.HOST;
export const CLIENT_URL = process.env.CLIENT_URL;
