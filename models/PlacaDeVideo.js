const mongoose = require("mongoose");

//Criando a tabela dentro do banco de dados

const PlacaDeVideo = mongoose.model("PlacaDeVideo", {
  marca: String,
  descricao: String,
  modelo: String,
  memoria: String,
  saidadeconexao: Number,
  sosuportado: String,
  peso: Number,
  preco: Number,
});

module.exports = PlacaDeVideo;
