const mongoose = require('mongoose');

// Define Article Schema
const articleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    content: {
        type: String,
        required: true,
        trim: true
    },

    author: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    tags: {
        type: [String],
        default: []
    }

}, {
    timestamps: true
});

// Create text index for article searching
articleSchema.index({
    title: 'text',
    content: 'text',
    tags: 'text'
});

// Create Article Model
const Article = mongoose.model('Article', articleSchema);

// Export Article Model
module.exports = Article;