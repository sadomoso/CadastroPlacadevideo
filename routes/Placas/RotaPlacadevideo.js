const rota = require("express").Router();
const { body, validationResult } = require("express-validator");
const PlacaDeVideo = require("../../models/PlacaDeVideo");

// const PlacaDeVideoController = require("./Controler/PlacaDeVideoController");

// let placaDeVideoController = new PlacaDeVideoController();
let RotasPlacasDeVideo;

RotasPlacasDeVideo = rota.post(
  "/create",
  [
    body("marca").isLength({ min: 1 }).withMessage("Marca é obrigatoria"),
    body("descricao")
      .isLength({ min: 1 })
      .withMessage("descricao é obrigatoria"),
    body("modelo").isLength({ min: 1 }).withMessage("modelo é obrigatoria"),
    body("memoria").isLength({ min: 1 }).withMessage("memoria é obrigatoria"),
    body("saidadeconexao")
      .isLength({ min: 1 })
      .withMessage("saidadeconexao é obrigatoria"),
    body("sosuportado")
      .isLength({ min: 1 })
      .withMessage("sosuportado é obrigatoria"),
    body("peso").isLength({ min: 1 }).withMessage("peso é obrigatoria"),
    body("preco").isLength({ min: 1 }).withMessage("preco é obrigatoria"),
  ],
  //   placaDeVideoController.create
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //   Nome: Felipe, CPF:13062059648, Aprovado: True
    const {
      marca,
      descricao,
      modelo,
      memoria,
      saidadeconexao,
      sosuportado,
      peso,
      preco,
    } = req.body;

    const placaDeVideo = {
      marca,
      descricao,
      modelo,
      memoria,
      saidadeconexao,
      sosuportado,
      peso,
      preco,
    };

    //   Metodo Create do mongoose para criar dados no sistema
    try {
      //criando os dados
      await PlacaDeVideo.create(placaDeVideo);

      res.status(201).json({ mensagem: "Placa inserida com sucesso!" });
    } catch (error) {
      res
        .status(400)
        .json({ error: error, mensagem: "Erro ao enviar informações" });
    }
  }
);

RotasPlacasDeVideo = rota.get("/findall", async (req, res) => {
  try {
    const placaDeVideo = await PlacaDeVideo.find();

    res.status(200).json(placaDeVideo);
  } catch (error) {
    res
      .status(400)
      .json({ error: error, mensagem: "Erro ao enviar informações" });
  }
});

RotasPlacasDeVideo = rota.get("/findbyid/:id", async (req, res) => {
  //extrair dado da requisição
  const id = req.params.id;
  try {
    const placaDeVideo = await PlacaDeVideo.findOne({ _id: id });
    if (!placaDeVideo) {
      res.status(424).json({ message: "Usuario não encontrado" });
      return;
    }
    res.status(200).json(placaDeVideo);
  } catch (error) {
    res
      .status(400)
      .json({ error: error, mensagem: "Erro ao enviar informações" });
  }
});

RotasPlacasDeVideo = rota.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  const {
    marca,
    descricao,
    modelo,
    memoria,
    saidadeconexao,
    sosuportado,
    peso,
    preco,
  } = req.body;

  const placaDeVideo = {
    marca,
    descricao,
    modelo,
    memoria,
    saidadeconexao,
    sosuportado,
    peso,
    preco,
  };

  try {
    const attPlacadeVideo = await PlacaDeVideo.updateOne(
      { _id: id },
      placaDeVideo
    );

    res.status(200).json(placaDeVideo);
  } catch (error) {
    res
      .status(400)
      .json({ error: error, mensagem: "Erro ao enviar informações" });
  }
});

RotasPlacasDeVideo = rota.delete("/delete/:id", async (req, res) => {
  //extrair dado da requisição
  const id = req.params.id;
  const placaDeVideo = await PlacaDeVideo.findOne({ _id: id });

  if (!placaDeVideo) {
    res.status(424).json({ message: "Item não encontrado" });
    return;
  }

  try {
    await PlacaDeVideo.deleteOne({ _id: id });
    res.status(200).json({ message: "Item deletado" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error, mensagem: "Erro ao enviar informações" });
  }
});
module.exports = RotasPlacasDeVideo;
