/* const express = require('express');

const router = express.Router();

// Import controller functions
const {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} = require('../controllers/articleController');


// CREATE ARTICLE
router.post('/', createArticle);

// GET ALL ARTICLES
router.get('/', getArticles);

// GET SINGLE ARTICLE
router.get('/:id', getArticleById);

// UPDATE ARTICLE
router.put('/:id', updateArticle);

// DELETE ARTICLE
router.delete('/:id', deleteArticle);


module.exports = router;

*/
//Article Routes with Validations
const express = require('express');

const router = express.Router();

// Import controllers
const {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    searchArticles
} = require('../controllers/articleController');

// Import validation middleware
const {
    validateCreateArticle,
    validateUpdateArticle
} = require('../middleware/validateArticle');


// CREATE ARTICLE
router.post('/', validateCreateArticle, createArticle);

// GET ALL ARTICLES
router.get('/', getArticles);

// SEARCH ARTICLES
router.get('/search', searchArticles);

// GET SINGLE ARTICLE
router.get('/:id', getArticleById);

// UPDATE ARTICLE
router.put('/:id', validateUpdateArticle, updateArticle);

// DELETE ARTICLE
router.delete('/:id', deleteArticle);


module.exports = router;