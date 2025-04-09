const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.get('/google/callback', authController.googleLogin)

module.exports = router;


// https://accounts.google.com/o/auth2/auth?client_id=425811330737-4h6nujqr7nd853gtk4i5dv773geua2m6.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/auth/google/callback&response_type=code&scope=email%20profile&access_type=offline

