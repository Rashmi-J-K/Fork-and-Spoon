const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema for the product details that will be embedded in the order
const ProductDetailSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  discount: {
    type: String,
  },
});

// Define the Request schema with an array of ProductDetailSchema
const RequestSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  products: [ProductDetailSchema], // Embed the product details directly
  status: {
    type: String,
    // Optionally, you might want to add validation here, e.g., enum: ['pending', 'completed']
  },
  name: {
    type: String,
    // Uncomment if name is required
    // required: true 
  },
  address: {
    type: String,
    // Uncomment if address is required
    // required: true 
  },
  phone: {
    type: String,
    // Uncomment if phone is required
    // required: true 
  },
  totalamount: {
    type: Number,
    // Uncomment if totalamount is required
    // required: true 
  },
  table: {
    type: Schema.Types.ObjectId,
    ref: 'table',
    required: true
  },
  feedback: {
    type: String,
  },
  transactionId: {
    type: String,
},
  reservation: {
    date: {
      type: String, // ISO date string
      required: true
    },
    time: {
      type: String, // Time in HH:mm format
      required: true
    }
  },
  
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

const Request = mongoose.model('request', RequestSchema);

module.exports = Request;
