const mongoose = require("mongoose");

//Criando a tabela dentro do banco de dados

const UserCadastro = mongoose.model("UserCadastro", {
  user: String,
  nome: String,
  email: String,
  senha: String,
});

module.exports = UserCadastro;
