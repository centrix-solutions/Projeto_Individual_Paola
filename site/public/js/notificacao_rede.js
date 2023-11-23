var notificacoes = [];

function buscarImportanciaMaquina(idMaquina, idEmpresa) {
    buscarTotalMaquinasEmpresa(idEmpresa)
        .then(totalMaquinas => {
            return new Promise((resolve) => {
                fetch(`/rede/importancia/${idMaquina}`)
                    .then(resposta => resposta.json()) // Transforma em um Json, melhor formato?
                    .then(resposta => {
                        const i = totalMaquinas;
                        var idMaquinaAnterior = 0
                        // AQUI O ID É 1
                        separar();
                        async function separar() {
                            for (; i > notificacoes.length;) {
                                if (idMaquina != idMaquinaAnterior) {
                                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                                    var importanciaAnterior = resposta[0].Importancia;
                                    var novaImportancia = resposta[0].Importancia;

                                    if (notificacoes.length < totalMaquinas) {
                                        notificacoes.push({
                                            idMaquina,
                                            importancia: resposta.Importancia
                                        });
                                    } else if (novaImportancia !== importanciaAnterior) {
                                        // A importância mudou, execute o bloco de código aqui
                                        console.log(`A importância mudou para: ${novaImportancia}`);

                                        // Atualize a importância anterior com a nova importância
                                        importanciaAnterior = novaImportancia;
                                        notificacoes.push({
                                            idMaquina,
                                            importancia: resposta.Importancia
                                        });
                                    }
                                    console.log(novaImportancia)

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

        var importancia = novaImportancia;
        var grauDeAviso = "";


        var listar = {
            Alta: {
                classe: 'cor-importancia critico',
                grau: 'critico'
            },
            Média: {
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

            if (document.getElementById(`corAlerta_${idMaquina}`)) {
                var card = document.getElementById(`corAlerta_${idMaquina}`);
                card.className = classe_listagem;
            }
        }
    }

    function exibirAlerta(importancia, idMaquina, grauDeAviso, grauDeAvisoCor) {

        var card = document.getElementById(`corAlerta_${idMaquina}`);
        if (card == null) {
            // Se o card não existe, crie-o
            var cardContainer = document.createElement('div');
            cardContainer.id = `cardContainer_${idMaquina}`;
            cardContainer.className = 'card-container';
            document.body.appendChild(cardContainer);

            card = document.createElement('div');
            card.id = `corAlerta_${idMaquina}`;
            card.className = 'card';
            cardContainer.appendChild(card);
        }
        card.innerHTML = transformarEmDiv({
            importancia,
            idMaquina,
            grauDeAviso,
            grauDeAvisoCor
        });
    }

    function removerAlerta(idMaquina) {
        notificacoes = notificacoes.filter(item => item.idMaquina != idMaquina);
        exibirCards(idMaquina);
    }

    function exibirCards(idMaquina) {
        // Encontre o contêiner para esta máquina
        var cardContainer = document.getElementById(`cardContainer_${idMaquina}`);

        if (!cardContainer) {
            // Se o contêiner para este idMaquina não existir, crie um novo.
            cardContainer = document.createElement('div');
            cardContainer.id = `cardContainer_${idMaquina}`;
            cardContainer.className = 'card-container';
            document.body.appendChild(cardContainer);
        } else {
            // Limpe o conteúdo existente
            cardContainer.innerHTML = '';
        }

        // Adicione os cartões
        notificacoes.forEach(notificacao => {
            if (notificacao.idMaquina === idMaquina) {
                cardContainer.innerHTML += transformarEmDiv(notificacao);
            }
        });
    }

    function transformarEmDiv({
        idMaquina,
        importancia,
        grauDeAviso,
        grauDeAvisoCor
    }) {
        // Crie o HTML para o card individual.
        var cardHTML = `
            <div class="card">
                <div class="container_card">
                    <span>Importância do Alarme:</span>
                    <div class="alerta ${grauDeAvisoCor}"><h4>${importancia}</h4></div>
                    <p>Computador com o Id: <span>${idMaquina}</span></p>
                </div>
            </div>
            <br>
        `;
        return cardHTML;
    }

    function atualizacaoPeriodica() {
        // JSON.parse(sessionStorage.AQUARIOS).forEach(item => {
        //     obterdados(item.id)
        // });
        setTimeout(atualizacaoPeriodica, 5000);
    }

    // PARA PODER RECUPERAR O COUNT DAS MAQUINAS
    async function buscarTotalMaquinasEmpresa(idEmpresa) {
        return new Promise((resolve, reject) => {
            fetch(`/rede/maqEmp/${idEmpresa}`)
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