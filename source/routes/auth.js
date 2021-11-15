const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt-validate')

const {songs} = require('../routes/tarea');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({success: true});
});

router.post('/registro', async(req, res) =>{
    if (req.body.mail && req.body.password) {
        // Formato del mail
        if (/^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
          res.status(400).json({ success: false, message: "Formato de email incorrecto" });
          return;
        }
    
        const existeUser = usuarios.find((u) => {
          return u.mail === req.body.mail;
        });
    
        if (existeUser) {
          res.status(400).json({ success: false, message: "Este email ya existe"});
          return;
        }
    
        const salt = await bcrypt.genSalt(10);
        console.log("Salt", salt);
        const password = await bcrypt.hash(req.body.password, salt);
    
        const newUser = {
          mail: req.body.mail,
          password: password
        };
    
        usuarios.push(newUser);
    
        return res.status(200).json({ success: true, newUser });
      } else {
        return res.status(400).json({
          success: false,
          message: "No se ingresaron los datos requeridos.",
        });
      }
    });
    router.post('/login', async(req, res) =>{
      const user = usuarios.find((u) => u.mail === req.body.mail);
      if(!user) {
        return res.status(400).json({error: "User not registered"});
       
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if(!validPassword) {
        return res.status(400).json ({error: "Invalid Password"})
      }
      const token = jwt.sign(
        {
          mail: user.mail,
          password: user.password
        },
        TOKEN_SECRET
    );

    console.log("login en auth, songs", songs);
    res.status(200).json ({
      error: null, 
      data: "Login successful",
      token,
      songs: songs,
    });
      });
    
 router.get("/usuarios", verifyToken, (req, res) => {
   console.log(req.user);
   res.json({error: null, usuarios})

 });
 module.exports = router;
 const usuarios = [{
   mail = "gustavoubal@aol.com",
   password: "12345@test"
 }]