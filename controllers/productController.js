import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, unit } = req.body;

    // Basic validation
    if (!title || !description || !price || !category || !stock || !unit) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Image URL from Cloudinary (via multer middleware)
    const image = req.file?.path;

    if (!image) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    // Create product
    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      unit,
      image,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};