const express = require('express');
const { User, Book } = require('./src/models');
const bookRoutes = require('./src/routes/bookRoutes'); 
const userRoutes = require('./src/routes/userRoutes'); 
const authRoutes = require('./src/routes/authRoutes'); 

const app = express();

app.use(express.json());


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