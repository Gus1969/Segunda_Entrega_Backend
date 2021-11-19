
 const bcrypt = require('bcrypt'); 
 const jwt = require('jsonwebtoken')
 const {TOKEN_SECRET} = require('../middlewares/jwt-validate')
 const {songs} = require('../routes/tarea');




  const registro = async(req, res, next) => {
    try {
      if (req.body.name && req.body.mail && req.body.password) {
        // Formato del mail
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
          res.status(400).json({ success: false, message: "email repetido" });
          return;
        }
    
        const salt = await bcrypt.genSalt(10);
        console.log("Salt", salt);
        const password = await bcrypt.hash(req.body.password, salt);
    
        const newUser = {
          nombre: req.body.name,
          mail: req.body.email,
          password: password
          
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
    
  
    const login = async(req, res, next) =>{

      try {
        
          const user = usuarios.find((u) => u.mail === req.body.mail);
      
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
              name: user.name,
              mail: user.mail,
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
   name: "Gustavo",
  mail: "gustavoubal@aol.com",
  password: "12345@test",
  
 }];

 const getUser = async (req, res, next) => {
   try {
     return res.json({error: null, usuarios})
   } catch (error) {
     return next(error)
     
   }
 }
 
 module.exports = {
   //registro, 
   login,
   getUser
 }

 