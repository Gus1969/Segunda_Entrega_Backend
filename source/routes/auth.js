const express = require('express');
const { verifyToken} = require("../middlewares/jwt-validate");
const {registro, login, getUsers } = require("../controllers-function-container/auth");
const router = express.Router();

router.post('/registro', registro);
router.post('/login', login);

router.get('/usuarios', verifyToken, getUsers);
  

module.exports = router;
