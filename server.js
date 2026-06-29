const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/prosensia_db')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Mongoose Schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// ✅ Seed Products
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const initialProducts = [
        {
          title: "Fjallraven - Foldsack No. 1 Backpack",
          price: 109.95,
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          description: "Your perfect pack for everyday use."
        },
        {
          title: "Mens Casual Premium Slim Fit T-Shirts",
          price: 22.3,
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          description: "Slim-fitting style, contrast raglan long sleeve."
        },
        {
          title: "Mens Cotton Jacket",
          price: 55.99,
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
          description: "Great outerwear jackets for Spring/Autumn/Winter."
        },
        {
          title: "Mens Casual Slim Fit",
          price: 15.99,
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
          description: "The color could be slightly different."
        },
        {
          title: "John Hardy Women's Legends Naga Chain Bracelet",
          price: 695,
          category: "jewelery",
          image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
          description: "From our Legends Collection."
        }
      ];
      await Product.insertMany(initialProducts);
      console.log('✅ Initial products seeded to database');
    }
  } catch (error) {
    console.error('❌ Seed error:', error);
  }
};
seedProducts();

// ✅ GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// ✅ POST /api/products
app.post('/api/products', async (req, res) => {
  try {
    const { title, price, category, image, description } = req.body;
    const newProduct = new Product({ title, price, category, image, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product' });
  }
});

// ✅ DELETE /api/products/:id
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

app.get('/', (req, res) => {
  res.send('🚀 ProSensia Backend with MongoDB is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📦 Products: http://localhost:${PORT}/api/products`);
});