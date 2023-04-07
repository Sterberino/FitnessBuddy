const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middleware/authentication.js')

const {
    Login, 
    Register, 
    verifyAuthentication
} = require('../controllers/auth.js')

router.post('/register', Register);
router.post('/login', Login);
router.get('/verifyAuthentication', authenticationMiddleware, verifyAuthentication);

module.exports = router;