import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config = {
  cloud_name: "dgunegdon",
  api_key: "359985353469849",
  api_secret: "Fw8QBbxJg7dzf4yqRW8PZSo_Mx0",
};

const storage = multer.memoryStorage();

export const imageUpload = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
};

export const upload = multer({ storage });
