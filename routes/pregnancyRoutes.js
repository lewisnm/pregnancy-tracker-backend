const express = require('express');
const router = express.Router();
const pregnancyController = require('../controllers/pregnancyController');
const authMiddleware = require('../middleware/auth'); // JWT Authentication middleware

// Route to add a new pregnancy record (requires authentication)
router.post('/', authMiddleware, pregnancyController.addPregnancy);

// Route to update pregnancy milestones
router.put('/:id', authMiddleware, pregnancyController.updatePregnancy);

// Route to get the pregnancy details for the logged-in user
router.get('/', authMiddleware, pregnancyController.getPregnancy);

module.exports = router;
