var notificacoes = [];

function buscarImportanciaMaquina(fkAndarDeTrabalho) {
    contarMaquinasAndar(fkAndarDeTrabalho)
        .then(totalMaquinasAndar => {
            return new Promise((resolve) => {
                fetch(`/rede/importancia/${fkAndarDeTrabalho}`)
                    .then(resposta => resposta.json()) // Transforma em um Json, melhor formato?
                    .then(resposta => {
                        console.log(resposta)
                        var idMaquinaAnterior = 0
                        // AQUI O ID É 1
                        notificacoes = [];
                        separar();
                        async function separar() {
                            for (i = totalMaquinasAndar; i > notificacoes.length;) {
                                if (resposta.idMaquina != idMaquinaAnterior) {
                                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                                    var importanciaAnterior = resposta[notificacoes.length].Importancia;
                                    var novaImportancia = resposta[notificacoes.length].Importancia;
                                    var idMaquina = resposta[notificacoes.length].idMaquina

                                    if (notificacoes.length < totalMaquinasAndar) {
                                        notificacoes.push({
                                            idMaquina: idMaquina,
                                            importancia: resposta[notificacoes.length].Importancia
                                        });
                                    } else if (novaImportancia !== importanciaAnterior) {
                                        // A importância mudou, execute o bloco de código aqui
                                        console.log(`A importância mudou para: ${novaImportancia}`);

                                        // Atualize a importância anterior com a nova importância
                                        importanciaAnterior = novaImportancia;
                                        notificacoes.push({
                                            idMaquina: idMaquina,
                                            importancia: resposta[notificacoes.length].Importancia
                                        });
                                    }

                                    notificar(novaImportancia, idMaquina)
                                    idMaquinaAnterior = idMaquina

                                    await resolve(resposta); // A PARTIR DO RESOLVE ELE NÃO É MAIS 1
                                } else {
                                    return
                                }
                            }
                        }
                    })
            })
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ maquina: ${error.message}`);
        });

    function notificar(novaImportancia, idMaquina) {
        console.log(novaImportancia)

        var importancia = novaImportancia;
        var grauDeAviso = "";

        var listar = {
            Perigo: {
                classe: 'cor-importancia critico',
                grau: 'critico'
            },
            Atenção: {
                classe: 'cor-importancia cuidado',
                grau: 'cuidado'
            }
        };

        if (listar[importancia]) {
            var classe_listagem = listar[importancia].classe;
            grauDeAviso = listar[importancia].grau;
            var grauDeAvisoCor = classe_listagem;

            exibirAlerta(importancia, idMaquina, grauDeAviso, grauDeAvisoCor);

            if (document.getElementById(`idMaq_${idMaquina}`) != null) {
                document.getElementById(`idMaq_${idMaquina}`).innerHTML = idMaquina;
            }

            if (document.getElementById(`importancia_${idMaquina}`) != null) {
                document.getElementById(`importancia_${idMaquina}`).innerHTML = importancia;
            }
        }
    }

    function exibirAlerta(importancia, idMaquina, grauDeAvisoCor) {
        var card_container = document.getElementById("cards_container");
        var card = document.getElementById(`card_${idMaquina}`);

        if (card == null) {
            // Se o card não existe, crie-o
            card = document.createElement('div');
            card.id = `card_${idMaquina}`;
            card.className = 'card';
            card.innerHTML = transformarEmDiv({
                importancia,
                idMaquina,
                grauDeAvisoCor
            });
            card_container.appendChild(card);
            card_container.appendChild(document.createElement(`br`))
        }
        card.innerHTML = transformarEmDiv({
            importancia,
            idMaquina,
            grauDeAvisoCor
        });
    }

    function transformarEmDiv({
        idMaquina,
        importancia,
        grauDeAvisoCor
    }) {
        // Crie o HTML para o card individual.
        console.log(importancia)
        var cardHTML = `
            <div class="card">
                <div class="container_card">
                    <div class="alerta ${grauDeAvisoCor}">!!!</div>
                    <p>Máquina com o Id:<span>${idMaquina} em \r\n${importancia}</span></p>
                </div>
            </div>
            <br>
        `;
        return cardHTML;
    }

    // PARA PODER RECUPERAR O COUNT DAS MAQUINAS
    async function contarMaquinasAndar(fkAndarDeTrabalho) {
        return new Promise((resolve, reject) => {
            fetch(`/rede/maqEmp/${fkAndarDeTrabalho}`)
                .then(resposta => resposta.text())
                .then(resposta => {
                    resolve(resposta)
                })
                .catch(function (error) {
                    reject()
                    console.error(`Erro na obtenção dos dados do aquario p/ maquina: ${error.message}`);
                });
        })
    }
}