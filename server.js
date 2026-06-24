const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Hardcoded products with 100% working image URLs
const products = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Chain Bracelet",
    price: 695,
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
  }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📦 Products: http://localhost:${PORT}/api/products`);
});