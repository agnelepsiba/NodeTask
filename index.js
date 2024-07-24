const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;


const connectDB = require('./config/db');
connectDB();


const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/auth'); 
const logRequest = require('./middleware/logRequest'); 
const modifyFile = require('./utils/file-modifier');
const productRoutes = require('./routes/products');

require('./scheduler');


app.use(bodyParser.json());
app.use(logRequest);


app.use('/auth', authRoutes);


app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.use('/api/products', productRoutes);


app.get('/modify-file', (req, res) => {
  modifyFile();
  res.send('File modification in progress.');
});


app.get('/', (req, res) => {
  res.send('Hello World! This is a GET request.');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
