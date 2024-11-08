// Model
import { Product } from "../../models/product.model.js";

export const getFilteredProducts = async (request, response) => {
  try {
    const {
      category = [],
      brand = [],
      sortBy = "price-lowtohigh",
    } = request.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const filteredProducts = await Product.find(filters).sort(sort);

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
