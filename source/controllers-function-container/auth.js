
 const bcrypt = require('bcrypt'); 
 const jwt = require('jsonwebtoken')
 const {TOKEN_SECRET} = require('../middlewares/jwt-validate')
 //const {songs} = require('../routes/tarea');




  const registro = async(req, res, next) => {
    try {
      if (req.body.email && req.body.password && req.body.confirm && req.body.genero && req.body.edad) {
        //expresion regular para validar formato de email
        if (/^\S+@\S+\.\S+$/.test(req.body.email) === false) {
          res
            .status(400)
            .json({ success: false, message: "Formato de mail incorrecto" });
          return;
        }
    
        const existeUser = usuarios.find((u) => {
          return u.email === req.body.email;
        });
    
        if (existeUser) {
          res.status(400).json({ success: false, message: "Ese email ya existe" });
          return;
        }
    
        const salt = await bcrypt.genSalt(10);
        //console.log("Salt", salt);
        const password = await bcrypt.hash(req.body.password, salt);
    
        const newUser = {
  
          email: req.body.email,
          password: password,
          confirm: req.body.confirm,
          genero: req.body.genero,
          edad: req.body.edad,
        
        };
    
        usuarios.push(newUser);
    
        return res.status(200).json({ success: true, newUser });
      } else {
        return res.status(400).json({
          success: false,
          message: "Faltan campos por completar",
        });
      }

    } catch (error) {
      return next (error);
      
    }
  };
    
  
    const login = async(req, res, next) => { 
      try {
          const user = usuarios.find((u) => u.email === req.body.email);
      
          if (!user) {
            return res
              .status(400)
              .json({ success: false, message: "Usuario no encontrado" });
          }
      
          const validPwd = await bcrypt.compare(
            req.body.password,
            user.password
          );
      
          if (!validPwd) {
            return res
              .status(400)
              .json({ success: false, message: "Wrong Password" });
          }
      
          const token = jwt.sign(
            {
              
              email: user.email,
              password: user.password
            },
            TOKEN_SECRET
          );
      
          return res.status(200).json({
            success: true,
            data: user,
            token: token,
          });
        } catch (error) {
          return next(error);
        }
      };

 const usuarios = [{
  email: "gustavoubal@aol.com",
  password: "123abc",
  confirmacion: "123abc",
  genero: "pop",
  edad: 25,
 }];

 const getUser = async (req, res, next) => {
   try {
     return res.json({error: null, usuarios})
   } catch (error) {
     return next(error)
     
   }
 }
 
 module.exports = {
   registro, 
   login,
   getUser
 }

 