async function buscarAndares(idFuncionario){
    vetorImagensAndar = [];
    vetorPosicaoImagensAndar = [];
    
    var idEmpresaVar = sessionStorage.Empresa;
    try {
        var resposta = await fetch("/dashboard/buscarAndares", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idEmpresaServer: idEmpresaVar,
            })
        });
        if (resposta.ok) {
            var respostaJson = await resposta.json();
            console.log('JSON Andares: ', respostaJson);

            if (idFuncionario == undefined) {
                var select = document.getElementById('andares');
            } else {
                var select = document.getElementById(`andares-${idFuncionario}`);
            }
            select.innerHTML = "";
            
            var option = document.createElement('option');
            option.innerHTML = "Sem Andar";
            option.value = `andar-0`;
            select.appendChild(option);

            for (let i = 0; i < respostaJson.length; i++) {

                // var idAndarDeTrabalho = respostaJson[i].idAndar_de_trabalho;

                var option = document.createElement('option');
                option.innerHTML = respostaJson[i].num_andar;
                if (idFuncionario == undefined) {
                    idFuncionario = '';
                }
                option.value = `andar-${respostaJson[i].idAndar_de_trabalho}${idFuncionario}`;
                select.appendChild(option);
                vetorImagensAndar.push(respostaJson[i].foto_andar);
                vetorPosicaoImagensAndar.push(respostaJson[i].idAndar_de_trabalho)
            }
        }
    } catch (erro) {
        console.log("Erro: ", erro);
    }
}