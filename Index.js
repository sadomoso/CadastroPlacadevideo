const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());
require("dotenv/config");

//forma de ler json / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

//rotas da API
// const rotaCadastro = require("./routes/Rotas");
// app.use("/", rotaCadastro);

const RotasPlacasDeVideo = require("./routes/Placas/RotaPlacadevideo");
app.use("/PlacaDeVideo", RotasPlacasDeVideo);

const RotaUsuario = require("./routes/login/RotaUsuario");
app.use("/Usuario", RotaUsuario);

//rota inicial / endpoint

app.get("/", (req, res) => {
  //mostrar req
  res.json({ mensagem: "Conectado ao BancoProva" });
});

//entregar uma porta

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Conectado ao BancoProva"), app.listen(3001);
  })
  .catch((error) =>
    console.log("erro, não conseguimos conectar ao banco", error)
  );
