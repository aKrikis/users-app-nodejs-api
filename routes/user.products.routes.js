const express = require('express');
const router = express.Router();

const userProductController = require('../controllers/user.product.controller');

// GET ACTIONS
router.get ('/', userProductController.findAll);
router.get('/:username', userProductController.findOne);
router.get('/stats/stats1', userProductController.stats1);

// POST ACTIONS
router.post('/', userProductController.create);

// PATCH ACTIONS
router.patch('/:username', userProductController.update);

// DELETE ACTIONS
router.delete('/:username/:products/:id', userProductController.delete);



module.exports = router;