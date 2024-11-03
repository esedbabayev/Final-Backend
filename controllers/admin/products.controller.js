import { imageUpload } from "../../helpers/cloudinary.js";

// Model
import { Product } from "../../models/product.model.js";

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

// Add product
export const addProduct = async (request, response) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = request.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newProduct.save();

    response.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};

// Get all products
export const getAllProducts = async (request, response) => {
  try {
    const allProducts = Product.find({});
    response.status(200).json({ success: true, data: allProducts });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};

// Edit product
export const editProduct = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = request.body;

    const getProduct = await Product.findById(id);
    if (!getProduct)
      return response.status(404).json({
        success: false,
        message: "Product doesn't exists",
      });

    getProduct.title = title || getProduct.title;
    getProduct.description = description || getProduct.description;
    getProduct.category = category || getProduct.category;
    getProduct.brand = brand || getProduct.brand;
    getProduct.price = price || getProduct.price;
    getProduct.salePrice = salePrice || getProduct.salePrice;
    getProduct.totalStock = totalStock || getProduct.totalStock;
    getProduct.image = image || getProduct.image;

    await getProduct.save();

    response.status(200).json({
      success: true,
      data: getProduct,
      message: "Product edited successfully",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};

// Delete product
export const deleteProduct = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};
