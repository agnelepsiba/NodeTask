const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const validateProduct = require('../validators/productValidator');

const dataFilePath = path.join(__dirname, '../data/products.json');

// Helper function to read data from the file
const readData = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([])); // Create file if it doesn't exist
  }
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write data to the file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// GET all products
router.get('/', (req, res) => {
  const data = readData();
  res.json(data);
});

// GET a single product by ID
router.get('/:id', (req, res) => {
  const data = readData();
  const product = data.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// POST a new product
router.post('/', validateProduct, (req, res) => {
  const data = readData();
  console.log('Data:', data);
  
  const newProduct = req.body;
  console.log('Incoming Product Data:', newProduct); 

  newProduct.id = data.length ? (data[data.length - 1].id + 1) : 1;
  console.log('Generated ID:', newProduct.id); 

  data.push(newProduct);
  writeData(data);
  res.status(201).json(newProduct);
});

// PUT (update) a product by ID
router.put('/:id', validateProduct, (req, res) => {
  const data = readData();
  const productIndex = data.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex !== -1) {
    data[productIndex] = { ...data[productIndex], ...req.body };
    writeData(data);
    res.json(data[productIndex]);
  } else {
    res.status(404).send('Product not found');
  }
});

// DELETE a product by ID
router.delete('/:id', (req, res) => {
  let data = readData();
  const productIndex = data.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex !== -1) {
    data.splice(productIndex, 1);
    writeData(data);
    res.status(204).send(); // No content
  } else {
    res.status(404).send('Product not found');
  }
});

module.exports = router;
