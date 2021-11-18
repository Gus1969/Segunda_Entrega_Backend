const express = require('express');
const path = require ('path');
const cors = require ('cors');
const authRouter = require("./source/routes/auth");
const { router:  tareasRouter} = require("./source/routes/tarea");

const app = express();
const PORT = 10000 ;
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
})
);
app.use('/auth', authRouter);
app.use('/tareas', tareasRouter)
app.use(cors());
//creando el servidor 

app.get('/', (req, res) => {
    res.send("Servidor funciona perfecto")
})

    


app.listen(PORT, function() { 
 console.log(`corriendo en puerto ${PORT}`)
});
