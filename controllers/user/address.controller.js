// Model
import { Address } from "../../models/address.model.js";

export const addAddress = async (request, response) => {
  try {
    const { userId, address, city, postCode, phone, notes } = request.body;

    if (!userId || !address || !city || !postCode || !phone || !notes) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      postCode,
      phone,
      notes,
    });

    await newAddress.save();

    response.status(201).json({
      success: true,
      message: "Address added successfully",
      data: newAddress,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};

export const getAllAddresses = async (request, response) => {
  try {
    const { userId } = request.params;

    if (!userId) {
      return response
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const address = await Address.find({ userId });

    response.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};

export const editAddress = async (request, response) => {
  try {
    const { userId, addressId } = request.params;
    const formData = request.body;

    if (!userId || !addressId) {
      return response
        .status(400)
        .json({ success: false, message: "User and address IDs are required" });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return response.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    response.status(200).json({
      success: true,
      message: "Address edited successfully",
      data: address,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};

export const deleteAddress = async (request, response) => {
  try {
    const { userId, addressId } = request.params;

    if (!userId || !addressId) {
      return response.status(400).json({
        success: false,
        message: "User and address IDs are required",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return response.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    response.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};
