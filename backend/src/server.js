const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/database');
const authRoutes = require('./routes/authRouter');
const resourceRoutes = require('./routes/resources');
const previousPapersRoute = require('./routes/paperRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

const app = express();

connectDB();
mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/papers', previousPapersRoute);
app.use('/api/discussions', discussionRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/subjects', subjectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));