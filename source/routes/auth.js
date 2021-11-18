const express = require('express');
const {songs} = require('./tarea')
const {registro, login} = require("../controllers-function-container/auth");
const router = express.Router();

 
// router.post('./password' password)

// router.get('/usuarios', getUser);
router.get("/", (req, res) => {
    res.json({ success: true });
  });
  router.post('/registro', registro);
 router.post('/login', login);
  
//     const user = usuarios.find((u) => u.mail === req.body.mail);
//     if (!user) {
//       return res.status(400).json({ error: "Usuario no encontrado" });
//     }
  
//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword) {
//       return res.status(400).json({ error: "Contraseña no válida" });
//     }
  
//     // Crear el token
//     const token = jwt.sign(
//       {
//         name: user.name,
//         mail: user.mail,
//       },
//       TOKEN_SECRET
//     );
  
//     console.log("Login en auth, listaDeTareas", listaDeTareas);
//     res.status(200).json({
//       error: null,
//       data: "Login exitoso",
//       token,
//       listaDeTareas: listaDeTareas,
//     });
//   });
  
//   //Listar usuarios solo puede ser consumida por alguien autorizado
//   router.get("/usuarios", verifyToken, (req, res) => {
//     // Podemos acceder a los datos del usuario que hizo la request
//     // Segun el JWT que envio en los headers de la request
//     console.log(req.user);
  
//     res.json({ error: null, usuarios });
//   });
  
   module.exports = router;
  
  
  
