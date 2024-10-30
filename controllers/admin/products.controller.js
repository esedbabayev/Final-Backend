import { imageUpload } from "../../helpers/cloudinary.js";

export const uploadImageHandler = async (request, response) => {
  try {
    const b64 = Buffer.from(request.file.buffer).toString("base64");

    const url = "data:" + request.file.mimetype + ";base64," + b64;

    const result = await imageUpload(url);

    response.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    response.json({
      success: false,
      message: "An error occured",
    });
  }
};
