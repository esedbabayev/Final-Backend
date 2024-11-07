// Model
import { Product } from "../../models/product.model.js";

export const getFilteredProducts = async (request, response) => {
  try {
    const filteredProducts = await Product.find({});

    response.status(200).json({
      success: true,
      data: filteredProducts,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};
