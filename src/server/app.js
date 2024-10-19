require('dotenv').config({ path: '../mongo.env' });
const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const { verifyToken } = require('./middleware/authMiddleware');
const cors = require('cors');
const mongoose = require('mongoose');
const addTaskRoute = require('./routes/addTaskRoute');
const displayTaskRoute = require('./routes/displayTaskRoute');
const updateTaskRoute = require('./routes/updateTaskRoute');
const deleteTaskRoute = require('./routes/deleteTaskRoute');

const mongoUri = process.env.MONGO_URI;

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  }));

  
app.use('/login', loginRoute);
app.use('/register/user', bodyParser.json(), registerRoute);
app.use('/tasks', verifyToken, bodyParser.json(), addTaskRoute);
app.use('/tasks/update', verifyToken, bodyParser.json(), updateTaskRoute);
app.use('/tasks/delete', verifyToken, deleteTaskRoute);
app.use('/tasks/display', verifyToken, displayTaskRoute);





mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
