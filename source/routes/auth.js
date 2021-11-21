const express = require('express');
const { verifyToken } = require('../middlewares/jwt-validate');
const {registro, login, getUser} = require("../controllers-function-container/auth");
const router = express.Router();

//const {songs} = require('../routes/auth')

  router.post('/registro', registro);
  router.post('/login', login);

  router.get('/usuarios', verifyToken, getUser)
    
  
  
   module.exports = router;
  
  
  
