var database = require("../database/config");

function cadastrarFuncionario(nome, email, senha, fkEmpresa, nivelAcesso, fkAndar) {
  var instrucaoSql1 = `INSERT INTO Funcionario (nome, email, senha, fkEmpFunc, fkNivelAcesso, fkAndar) VALUES 
  ('${nome}', '${email}','${senha}', ${fkEmpresa}, ${nivelAcesso}, ${fkAndar})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql1);
  return database.executar(instrucaoSql1);
}
function buscarFuncionarios(idEmpresa) {
  var instrucao = `SELECT Login.idLogin AS idLogin, Funcionario.idFuncionario as idFuncionario, Funcionario.nome AS nome, Funcionario.email AS email, Funcionario.fkNivelAcesso AS nivelAcesso, Funcionario.fkAndar AS fkAndar, Login.Id_do_dispositivo AS idDispositivo, Login.dataHoraEntrada AS dataHoraEntrada, Login.dataHoraSaida AS dataHoraSaida FROM funcionario LEFT JOIN Login ON Funcionario.idFuncionario = Login.idFuncionario WHERE Funcionario.fkEmpFunc = ${idEmpresa}`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function mudarNivelAcesso(idFuncionario, tipo) {
  var instrucao = `UPDATE Funcionario SET fkNivelAcesso = ${tipo} WHERE idFuncionario = ${idFuncionario};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function mudarAndar(idFuncionario, andar) {
  var instrucao = `UPDATE Funcionario SET fkAndar = ${andar} WHERE idFuncionario = ${idFuncionario};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrarFuncionario,
  buscarFuncionarios,
  mudarNivelAcesso,
  mudarAndar
}