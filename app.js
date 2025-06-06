const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api',authRoutes);
app.use('/api',bookRoutes);
app.use('/api',reviewRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(3000, () => console.log("Server started on port 3000"));
})
.catch(err => console.error("DB connection error:", err));