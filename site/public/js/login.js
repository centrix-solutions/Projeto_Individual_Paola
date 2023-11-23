async function buscarLogin(){
    var idEmpresa = sessionStorage.idEmpresa;
    try {
        var resposta = await fetch("/login/buscarLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idEmpresaServer: idEmpresa,
            })
        });
        if (resposta.ok) {
            var respostaJson = await resposta.json();
            console.log('JSON: ', respostaJson);
            return respostaJson;
        }
    } catch (erro) {
        console.log("Erro: ", erro);
    }
}