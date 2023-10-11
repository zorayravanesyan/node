const express = require('express');
const bookRoutes = require('./src/routes/bookRoutes'); 
const userRoutes = require('./src/routes/userRoutes'); 
const authRoutes = require('./src/routes/authRoutes'); 
const productRoutes = require('./src/routes/productRoutes');
const app = express(); // սերվեր ենք սարքում

app.use(express.json()); // Թողնում ենք որ json ուղարկեն մեզ
app.use((err, req, res, next) => {
    res.status(400).json({ error: err.message });
  });
  app.use('/products', productRoutes);  

app.use('/books', bookRoutes);

app.use('/auth', authRoutes);
app.use('/user', userRoutes);




app.get('/', (req, res, next) => {
    res.send('Page is Empty');
    next();
})




app.get('/kim', (req, res, next) => {
    res.send('Kim Kardashyan');
    next();
})
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
})