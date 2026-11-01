require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Article = require('./models/Article');

const seedArticles = async () => {
    try {

        // Connect to MongoDB
        await connectDB();

        // Sample articles
        const articles = [
            {
                title: 'Introduction to Backend Development',
                content: 'Backend development involves building server-side applications, APIs, database integrations and business logic.',
                author: 'Umar Musisi',
                category: 'Technology',
                tags: ['Backend', 'Node.js', 'Express']
            },

            {
                title: 'Understanding MongoDB and Mongoose',
                content: 'MongoDB is a NoSQL database that stores information in flexible documents. Mongoose provides an object data modelling layer for Node.js applications.',
                author: 'Umar Musisi',
                category: 'Database',
                tags: ['MongoDB', 'Mongoose', 'Database']
            }
        ];

        // Insert articles into database
        const insertedArticles = await Article.insertMany(articles);

        console.log(`${insertedArticles.length} articles inserted successfully`);

        console.log(insertedArticles);

    } catch (error) {

        console.error('Seeding failed:', error.message);

    } finally {

        await mongoose.connection.close();

        console.log('Database connection closed');
    }
};

seedArticles();