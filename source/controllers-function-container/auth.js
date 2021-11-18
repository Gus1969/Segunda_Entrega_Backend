
 const bcrypt = require('bcrypt'); const jwt = require('jsonwebtoken');
 const jwt = require('jsonwebtoken')
 const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt-validate')
 const {songs} = require('../routes/tarea');




  const registro = async(req, res, next) => {
    try {
      if (req.body.email && req.body.password && req.body.confirm) {
        // Formato del mail
        if (/^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
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
          email: req.body.email,
          password: password,
          confirm: password
        };
    
        usuarios.push(newUser);
    
        return res.status(200).json({ success: true, newUser });
      } else {
        return res.status(400).json({
          success: false,
          message: "Faltan datos (requeridos: email, password, confirmacion)",
        });
      }

    } catch (error) {
      return next (error);
      
    }
  };
    
  
    const login = async(req, res, next) =>{

      try {
        const user = usuarios.find((u) => u.email === req.body.email);
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
    
      usuarios.push(newUser);

    console.log("login en auth, songs", songs);
    res.status(200).json ({
      error: null, 
      data: "Login successful",
      token,
      songs: songs,
    }); 
      } catch (error) {
        return next(error)
      }
      };

      

    
 
 
 
 
//  const getUser = (req, res) =>{
//    try {
//      return res.json({error: null, usuarios})
     
//    } catch (error) {
//      console.log(error)
     
//    }
//  }
 const usuarios = [{
  email: "gustavoubal@aol.com",
  password: "12345@test",
  confirmacion: "12345@test",
 }];
 
 module.exports = {
   registro, 
   login
 }

 