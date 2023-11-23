// AQUI VOU RECUPERAR PARA O GRÁFICO MEIA-LUA

var dados = []
let ctx = 0;

function obterDadosGraficoMeiaLua(fkAndarDeTrabalho, canvaId) {
    if (dados.length > 0) {
        dados = []
    }

    if (fkAndarDeTrabalho > 0) {
        const data = {
            labels: ['Perigo', 'Atenção', 'Normal'],
            datasets: [{
                label: 'Últimos alertas do andar ',
                data: dados,
                backgroundColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 167, 34, 1)',
                    'rgba(39, 36, 62, 1)'
                ],
                cutout: '80%',
                circumference: 180,
                rotation: 270
            }]
        };

        // config
        const config = {
            type: 'doughnut',
            data,
            options: {
                aspectRatio: 2,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        };

        if (ctx !== 0) {
            ctx.destroy();
        }

        ctx = new Chart(
            document.getElementById(`${canvaId}`),
            config
        );



        // BANCO RECUPERAÇÃO
        function atualizarGraficoMeiaLua() {

            fetch(`/rede/alertaPerigo/${fkAndarDeTrabalho}`, {
                    cache: 'no-store'
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Nenhum dado encontrado ou erro na API');
                    }
                })
                .then(novoRegistro => {
                    if (dados.perigo !== novoRegistro.TotalAlertasTipo) {
                        dados.perigo = novoRegistro.TotalAlertasTipo;
                        ctx.data.datasets[0].data[0] = novoRegistro.TotalAlertasTipo;
                       
                    }
                    setTimeout(atualizarGraficoMeiaLua, 4000);
                })
                .catch(error => {
                    console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
                    setTimeout(atualizarGraficoMeiaLua, 4000);
                });


            // TIPO ATENÇÃO
            fetch(`/rede/alertaAtencao/${fkAndarDeTrabalho}`, {
                    cache: 'no-store'
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Nenhum dado encontrado ou erro na API');
                    }
                })
                .then(novoRegistro => {
                    if (dados.atencao !== novoRegistro.TotalAlertasTipo) {
                        dados.atencao = novoRegistro.TotalAlertasTipo;
                        ctx.data.datasets[0].data[0] = novoRegistro.TotalAlertasTipo;
                    
                    }
                })
                .catch(error => {
                    console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
                    setTimeout(atualizarGraficoMeiaLua, 4000);
                });

            fetch(`/rede/total/${fkAndarDeTrabalho}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Nenhum dado encontrado ou erro na API');
                    }
                })
                .then(novoRegistro => {
                    if (dados.total !== novoRegistro.Monitoradas) {
                        dados.total = novoRegistro.Monitoradas;
                        ctx.data.datasets[0].data[0] = novoRegistro.Monitoradas;
                        
                    }
                    setTimeout(atualizarGraficoMeiaLua, 4000);
                })
                .catch(error => {
                    console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
                    setTimeout(atualizarGraficoMeiaLua, 4000);
                });
        }

        fetch(`/rede/alertaPerigo/${fkAndarDeTrabalho}`, {
                cache: 'no-store'
            })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro na requisição.');
                }
            })
            .then((resposta) => {
                resposta.reverse();
                for (const registro of resposta) {
                    dados.push(registro.TotalAlertasTipo);
                }
               
            })
            .catch((error) => {
                console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
            });

        // TIPO ATENÇÃO
        fetch(`/rede/alertaAtencao/${fkAndarDeTrabalho}`, {
                cache: 'no-store'
            })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro na requisição.');
                }
            })
            .then((resposta) => {
                resposta.reverse();
                for (const registro of resposta) {
                    if (resposta == 0) {
                        dados.push(0)
                    } else {
                        dados.push(registro.TotalAlertasTipo);
                    }
                }
              
            })
            .catch((error) => {
                console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
            });

        fetch(`/rede/total/${fkAndarDeTrabalho}`, {
                cache: 'no-store'
            })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro na requisição.');
                }
            })
            .then((resposta) => {
                for (const registro of resposta) {
                    var subAlerta = (registro.Monitoradas - (dados[0] + dados[1]))
                    resposta.reverse();
                    if (subAlerta == 0) {
                        dados.push(0)
                        ctx.update();
                    } else {
                        dados.push(subAlerta);
                        ctx.update();
                    }
                }
                
            })
            .catch((error) => {
                console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
            });
        console.log(dados)
    }
}