const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const connectDB = require('./config/database');
const authRoutes = require('./routes/authRouter');
const cors = require('cors');

const resourceRoutes = require('./routes/resources');


const path = require('path');

const app = express();

connectDB();
mongoose.connect(process.env.MONGO_URI);


app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json());
app.use(previousPapersRoute);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/resources', resourceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
