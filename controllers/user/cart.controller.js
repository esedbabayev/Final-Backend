// Models
import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/product.model.js";

export const addToCart = async (request, response) => {
  try {
    const { userId, productId, quantity } = request.body;

    if (!userId || !productId || quantity <= 0) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return response
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();
    response.status(200).json({
      success: true,
      message: "Product added to the cart",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};

export const getCartItems = async (request, response) => {
  try {
    const { userId } = request.params;

    if (!userId) {
      return response
        .status(400)
        .json({ success: false, message: "User id is mandatory" });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "item.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return response
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const validItems = cart.items.filter((product) => product.productId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    response.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};

export const updateCartItemQuantity = async (request, response) => {
  try {
    const { userId, productId, quantity } = request.body;

    if (!userId || !productId || quantity <= 0) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return response
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return response
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    cart.items[findCurrentProductIndex].quantity += quantity; // = quantity

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    response.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};

export const removeFromCart = async (request, response) => {
  try {
    const { userId, productId } = request.params;

    if (!userId || !productId) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "item.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return response.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await Cart.populate({
      path: "item.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    response.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};
