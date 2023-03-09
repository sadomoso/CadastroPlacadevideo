const rota = require("express").Router();
const { body } = require("express-validator");
const UserCadastro = require("../../models/UserCadastro");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

let RotaUsuarios;

RotaUsuarios = rota.get(
  "/login",
  [
    body("user").isLength({ min: 1 }).withMessage("Usuario é obrigatorio"),
    body("senha").isLength({ min: 1 }).withMessage("Senha é obrigatorio"),
  ],

  async (req, res) => {
    const { user, senha } = req.body;

    const userLogin = {
      user,
      senha,
    };
    const dado = await UserCadastro.findOne({
      user,
    });
    try {
      if (dado?.user === userLogin.user) {
        const checksenha = await bcrypt.compare(userLogin.senha, dado.senha);
        if (checksenha === true) {
          try {
            const secret = process.env.SECRET;
            const token = jwt.sign(
              {
                id: dado._id,
              },
              secret
            );
            res.json({
              mensagem: `Login realizado. Nome do usuario: ${dado.nome}, Email do usuario ${dado.email}`,
              token,
            });
          } catch (error) {
            console.log(error);
            res.status(404).json({ error: "erro ao tentar gerar token" });
          }
        } else {
          res.json({ mensagem: "senha incorretos" });
        }
      } else {
        res.json({ mensagem: "Usuario não existe" });
      }
    } catch {
      res
        .status(404)
        .json({ error: "erro ao tenta se conectar com o servidor" });
    }
  }
);

RotaUsuarios = rota.post(
  "/cadastro",
  [
    body("user").isLength({ min: 1 }).withMessage("Usuario é obrigatorio"),
    body("nome").isLength({ min: 1 }).withMessage("Nome é obrigatorio"),
    body("email").isLength({ min: 1 }).withMessage("Email é obrigatorio"),
    body("senha").isLength({ min: 1 }).withMessage("Senha é obrigatorio"),
  ],

  async (req, res) => {
    const { user, nome, email, senha } = req.body;
    //criptografia de senha
    const senhaCrypt = await bcrypt.hash(senha, 10);
    const userCadastro = {
      user,
      nome,
      email,
      senha: senhaCrypt,
    };

    try {
      //criando os dados

      const dado = await UserCadastro.findOne({
        user: userCadastro.user,
      });

      if (dado?.user === userCadastro.user) {
        res.status(404).json("usuario ja existe");
      } else {
        await UserCadastro.create(userCadastro);
        res
          .status(201)
          .json({ mensagem: "Pessoa inserida com sucesso!", userCadastro });
      }
    } catch (error) {
      res
        .status(400)
        .json({ error: error, mensagem: "Erro ao enviar informações" });
    }
  }
);

RotaUsuarios = rota.get("/TodosUsuarios", async (req, res) => {
  try {
    const todosUsuarios = await UserCadastro.find();

    res.status(200).json(todosUsuarios);
  } catch (error) {
    res
      .status(400)
      .json({ error: error, mensagem: "Erro ao enviar informações" });
  }
});
module.exports = RotaUsuarios;
