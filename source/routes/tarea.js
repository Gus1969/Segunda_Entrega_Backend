const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/jwt-validate");

const songs  = [
  {
    nombre: "One night in Bangkok",
    ruta: "./songs/bangkok.mp3 ",
    icono: "./IMG/Boney.png",
    artista: "Boney M",
    reproducciones: 15
  },
  {
    nombre: "I feel love",
    ruta: "./songs/donna.mp3",
    icono: "./IMG/Donna.png",
    artista: "Donna Summer",
    reproducciones: 17
  },
  {
    nombre: "Rio",
    ruta: "./songs/Rio.mp3",
    icono: "./IMG/Duran.jpg",
    artista: "Duran Duran",
    reproducciones: 30
  },
  {
    nombre: "Der Kommiser",
    ruta: "./songs/falco.mp3",
    icono: "./IMG/slider1.png",
    artista: "Falco",
    reproducciones: 18
  },
  {
    nombre: "Poker face",
    ruta: "./songs/lg.mp3",
    icono: "./IMG/LG1.png",
    artista: "Lady Gaga",
    reproducciones: 29

  },
  {
    nombre: "Dancing in the streets",
    ruta: "./songs/mick.mp3",
    icono: "./IMG/mick.jpg",
    artista: "Mick Jagger & David Bowie",
    reproducciones: 22
  },
  {
    nombre: "Radio Ga-ga",
    ruta: "./songs/queen.mp3",
    icono: "./IMG/Queen1.png",
    artista: "Queen",
    reproducciones: 23
  },
  {
    nombre: "Rasputin",
    ruta: "./songs/Raspu.mp3",
    icono: "./IMG/Boney.png",
    artista: "Boney M",
    reproducciones: 25
  },
  
  {
    nombre:  "By the rivers of Babilon",
    ruta: "./songs/rivers.mp3",
    icono: "./IMG/logo.png",
    artista: "Boney M",
    reproducciones: 20
  }
]
router.get("/", (req, res) => {
  res.send({
    tarea: songs,
  });
});

router.post("/ songs", verifyToken, (req, res) => {
  const nombre = req.body.nombre;
  const ruta = req.body.ruta;

  const canciones = {
    nombre: nombre,
    ruta: ruta,
    icono: req.user.icono,
    artista: req.user.artista,
    reproducciones: req.user.reproducciones
  };

  songs.push(canciones);

  res.send({
    canciones: songs,
    
  });
});

module.exports = {
  router: router,
  songs,
};