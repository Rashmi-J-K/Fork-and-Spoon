const Product = require('../../Modal/Product');
const Category = require('../../Modal/Category');
const path = require('path');
const fs = require('fs');

const addProduct = async (req, res) => {
    try {
        const { name, price, description, discount, category } = req.body;
        console.log(req.body, 555);

        // Check if the category exists
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).send({ status: false, message: 'Category does not exist' });
        }
        
         // Check if the product already exists
         const productExists = await Product.findOne({ name });
         if (productExists) {
             return res.status(400).send({ status: false, message: 'Product already exists' });
         }
 

        // Handle image file upload
        const image = req.file ? req.file.filename : null;
        console.log(image, 'image');

        // Create a new product
        const product = new Product({
            name,
            price,
            description,
            discount,
            category,
            image
        });

        // Save the product to the database
        await product.save();
        // Send response
        res.status(201).send({ status: true, message: 'Added product successfully', });
    } catch (error) {
        console.error('Error adding product:', error.message);
        res.status(500).send({ status: false, message: 'Internal server error' });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.send({ status: true, products });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).send({ status: false, message: 'Internal server error occurred' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        let productInfo = await Product.findById(req.params.id);
        if (!productInfo) {
            return res.status(404).send("Not Found");
        }
        productInfo = await Product.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Category deleted successfully", product: productInfo, success: true });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, discount, category } = req.body;
        const updateData = {};
        if (name) updateData.name = name;
        if (price) updateData.price = price;
        if (description) updateData.description = description;
        if (discount) updateData.discount = discount;
        if (category) updateData.category = category;
        if (req.file) updateData.image = req.file.filename;
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ status: false, message: 'Product not found' });
        }
        product = await Product.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
        console.log(product,'product');
        res.json({ status: true, product });
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).send({ status: false, message: 'Internal server error occurred' });
    }
};

module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct
};
