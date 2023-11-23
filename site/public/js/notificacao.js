async function enviarAlerta(idFuncionario) {
    var nomeFuncionario = sessionStorage.nome;
    try {
        var resposta = await fetch("/notificacao/enviarAlerta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idFuncionarioServer: idFuncionario,
                nomeFuncionarioServer: nomeFuncionario
            })
        });
        if (resposta.ok) {
            var respostaJson = await resposta.json();
            console.log('JSON: ', respostaJson);
            alert('Alerta enviado!');
        }
    } catch (erro) {
        console.log("Erro: ", erro);
    }
}
async function verificarAlerta(){
    var idFuncionario = sessionStorage.id;
    try {
        var resposta = await fetch("/notificacao/verificarAlerta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idFuncionarioServer: idFuncionario,
            })
        });
        if (resposta.ok) {
            var respostaJson = await resposta.json();
            console.log('JSON Alerta: ', respostaJson);
            var nomeNotificacao = respostaJson[0].notificacao;
            var nomeFuncionario = sessionStorage.nome;
            if (respostaJson[0].notificacao != '' && respostaJson[0].notificacao != null) {
                retirarAlerta();
                alert(`Olá ${nomeFuncionario}, o seu turno acabou, por favor encerre as atividades. \r\n Ass: ${nomeNotificacao}`);
            }
        }
    } catch (erro) {
        console.log("Erro: ", erro);
    }
}
async function retirarAlerta(){
    var idFuncionario = sessionStorage.id;
    try {
        var resposta = await fetch("/notificacao/retirarAlerta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idFuncionarioServer: idFuncionario
            })
        });
        if (resposta.ok) {
            var respostaJson = await resposta.json();
            console.log('JSON: ', respostaJson);
        }
    } catch (erro) {
        console.log("Erro: ", erro);
    }
}
async function verificaNotificacao(){
    var idEmpresa = sessionStorage.Empresa;
    try {
        var resposta = await fetch("/notificacao/verificaNotificacao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idEmpresaServer: idEmpresa
            })
        });
        if (resposta.ok) {
            var respostaJson = await resposta.json();
            console.log('JSON Notificação: ', respostaJson);
            for (let i = 0; i < respostaJson.length; i++) {
                var idDispositivo = respostaJson[i].idDispositivo
                var funcionario = respostaJson[i].Funcionario_Solicitante
                alert(`Novo computador cadastrado no sistema!\r\nidDispositivo: ${idDispositivo}\r\nFuncionário:${funcionario}`);
            }
            retirarNotificacao();
        }
    } catch (erro) {
        console.log("Erro: ", erro);
    }
}
setInterval(() => {
    verificarAlerta()
    // verificaNotificacao()
}, 5000);

async function retirarNotificacao(){
    var idEmpresa = sessionStorage.Empresa;
    try {
        var resposta = await fetch("/notificacao/retirarNotificacao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idEmpresaServer: idEmpresa
            })
        });
        if (resposta.ok) {
            var respostaJson = await resposta.json();
            console.log('JSON: ', respostaJson);
        }
    } catch (erro) {
        console.log("Erro: ", erro);
    }
}
window.addEventListener('load', function() {
    verificarAlerta();
    verificaNotificacao();
});
