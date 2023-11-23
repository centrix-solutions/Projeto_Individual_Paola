var funcionarioModel = require("../models/funcionarioModel");

function cadastrarFuncionario(req, res) {

  var nome = req.body.nomeServer
  var email = req.body.emailServer
  var senha = req.body.senhaServer
  var fkEmpresa = req.body.fkEmpresaServer
  var nivelAcesso = req.body.nivelAcessoServer
  var fkAndar = req.body.fkAndarServer

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (nivelAcesso == undefined) {
    res.status(400).send("Seu nivelAcesso está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Seu fkEmpresa está undefined!");
  } else {
    funcionarioModel.cadastrarFuncionario(nome, email, senha, fkEmpresa, nivelAcesso, fkAndar)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro do funcionario! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }

}
function buscarFuncionarios(req, res) {

  var idEmpresa = req.body.idEmpresaServer;

  if (idEmpresa == undefined) {
      res.status(400).send("idEmpresa está undefined!");
  } else {
    funcionarioModel.buscarFuncionarios(idEmpresa)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao buscar funcionários Erro: ",
                      erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
}
function mudarNivelAcesso(req, res) {

  var idFuncionario = req.body.idFuncionarioServer;
  var tipo = req.body.tipoServer;

  if (idFuncionario == undefined || tipo == undefined) {
      res.status(400).send("idFuncionario ou tipo está undefined!");
  } else {
    funcionarioModel.mudarNivelAcesso(idFuncionario, tipo)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao buscar funcionários Erro: ",
                      erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
}
function mudarAndar(req, res) {

  var idFuncionario = req.body.idFuncionarioServer;
  var andar = req.body.andarServer;

  if (idFuncionario == undefined || andar == undefined) {
      res.status(400).send("idFuncionario ou andar está undefined!");
  } else {
    funcionarioModel.mudarAndar(idFuncionario, andar)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao buscar funcionários Erro: ",
                      erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
}
module.exports = {
  cadastrarFuncionario,
  buscarFuncionarios,
  mudarNivelAcesso,
  mudarAndar
}