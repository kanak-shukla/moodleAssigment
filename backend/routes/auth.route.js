const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
// const authenticate = require('../middleware/authenticate');

router.get('/', (req, res) => {
    res.send("Hello Kanak !! Welcome to BookStore server.")
})

//user routes
router.post('/login', authController.signIn);
router.post('/register', authController.register);
router.get('/getUsers', authController.listUsers);

//books routes
router.post('/addBook', authController.addBook);
router.post('/updateBook', authController.updateBook);
router.get('/getBooks', authController.listBooks);
router.get('/searchBook', authController.searchBook);

module.exports = router;