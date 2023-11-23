process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuariosRouter = require("./src/routes/usuarios");
var funcionariosRouter = require("./src/routes/funcionarios");
var empresasRouter = require("./src/routes/empresas");
var medidasRouter = require("./src/routes/medidas");
var relatoriosRouter = require("./src/routes/relatorios");
var dashboardRouter = require("./src/routes/dashboard");
var notificacaoRouter = require("./src/routes/notificacao");
var redeRouter = require("./src/routes/rede");

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); // tava false antes da foto
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuariosRouter);
app.use("/empresas", empresasRouter);
app.use("/funcionarios", funcionariosRouter);
app.use("/medidas", medidasRouter);
app.use("/relatorios", relatoriosRouter);
app.use("/dashboard", dashboardRouter);
app.use("/notificacao", notificacaoRouter);
app.use("/rede", redeRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});