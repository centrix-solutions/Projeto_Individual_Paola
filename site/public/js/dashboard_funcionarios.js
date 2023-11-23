var idEmpresa = sessionStorage.getItem('Empresa');
var token

function gerarToken() {
    const caracteres = '0123456789';
    let novoToken = '';
    for (let i = 0; i < 8; i++) {
        const aleatorizar = Math.floor(Math.random() * caracteres.length);
        novoToken += caracteres.charAt(aleatorizar);
    }
    return novoToken;
}

function resetarToken() {
    token = gerarToken()

    document.getElementById('divToken').innerText = 'Token: ' + token;
}

function cadastrarFuncionario() {
    var email_input = document.getElementById('email_input').value;


    if (email_input.indexOf("@") < 0) {
        spanEmail.innerHTML = "@ ausente, verifique o Email";
        spanEmail.style.color = "#690606";
    } else {
        spanEmail.innerHTML = "Email válido";
        spanEmail.style.color = "lime";

        var nomeVar = nome_input.value;
        var emailVar = email_input;
        var senhaVar = token;
        var idEmpresaVar = idEmpresa;
        var nivelAcessoVar = acesso_input.value;
        var fkAndarVar = andares.value;
        fkAndarVar = Number(fkAndarVar.split('-')[1]);

        if (fkAndarVar == 0) {
            fkAndarVar = null;
        }

        fetch("/funcionarios/cadastrarFuncionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
                fkEmpresaServer: idEmpresaVar,
                nivelAcessoServer: nivelAcessoVar,
                fkAndarServer: fkAndarVar
            })
        })
        .then(function(response) {
            if (response.status === 200) {
                location.reload();
            } else {
            }
        });
    }
}
