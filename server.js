require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();


// MIDDLEWARE
app.use(express.json());


// DATABASE CONNECTION
//connectDB();


// ROUTES
const articleRoutes = require('./routes/articleRoutes');

app.use('/api/articles', articleRoutes);


// HOME ROUTE
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Blog API'
    });
});

// GLOBAL ERROR HANDLER
app.use(errorHandler);

// SERVER
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Server startup failed:', error.message);
        process.exit(1);
    }
};

startServer();

const PORT = process.env.PORT || 3003;

//app.listen(PORT, () => {
    //console.log(`Server running on port ${PORT}`);
//});