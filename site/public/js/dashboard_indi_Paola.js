var idEmpresa = Number(sessionStorage.getItem('Empresa'));
var idMaquina = Number(sessionStorage.getItem('idComputador'));

window.onload = buscarComponentes(idMaquina, idEmpresa)

