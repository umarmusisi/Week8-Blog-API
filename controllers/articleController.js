const Article = require('../models/Article');
const mongoose = require('mongoose');

// 1. CREATE ARTICLE
const createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Article created successfully',
            data: article
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create article',
            error: error.message
        });
    }
};


// 2. GET ALL ARTICLES
const getArticles = async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: articles.length,
            data: articles
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve articles',
            error: error.message
        });
    }
};


// 3. GET SINGLE ARTICLE
const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid article ID'
            });
        }

        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }

        res.status(200).json({
            success: true,
            data: article
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve article',
            error: error.message
        });
    }
};


// 4. UPDATE ARTICLE
const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid article ID'
            });
        }

        const article = await Article.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Article updated successfully',
            data: article
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update article',
            error: error.message
        });
    }
};


// 5. DELETE ARTICLE
const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid article ID'
            });
        }

        const article = await Article.findByIdAndDelete(id);

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Article deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete article',
            error: error.message
        });
    }
};

// 6. SEARCH ARTICLES
const searchArticles = async (req, res) => {
    try {
        const { q } = req.query;

        // Check if search query is provided
        if (!q || !q.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a search keyword'
            });
        }

        // Search articles using MongoDB text search
        const articles = await Article.find({
            $text: { $search: q }
        });

        res.status(200).json({
            success: true,
            count: articles.length,
            data: articles
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to search articles',
            error: error.message
        });
    }
};


// EXPORT CONTROLLER FUNCTIONS
module.exports = {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    searchArticles
};