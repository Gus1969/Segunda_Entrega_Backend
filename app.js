const express = require('express');
//const path = require ('path');
const cors = require ('cors');
//const authRouter = require("./routes/auth");
//const { router:  tareasRouter} = require ("./routes/tareas");

const app = express();
const PORT = 4000 ;
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
})
);
app.use(cors());
//creando el servidor 

app.get('/', (req, res) => {
    res.send("Servidor creado")
})
    


app.listen(PORT, function() { 
 console.log(`corriendo en puerto ${PORT}`)
});
