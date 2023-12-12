var idEmpresa = Number(sessionStorage.getItem('Empresa'));
var idMaquina = Number(sessionStorage.getItem('idComputador'));
var vetoridComponentes = [];
var vetorValor = [];

function deletarComputador(idMaquina) {
    console.log(idMaquina)
    var removerMaquina = idMaquina
    console.log(removerMaquina)
    fetch("/medidas/deletarComputador", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            removerMaquinaSever: removerMaquina,
        })
    });
    window.location = "dashboard_main.html"
}

function buscarComponentes(idMaquina, idEmpresa) {
    fetch("/medidas/buscarComponentes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMaquinaServer: idMaquina,
            idEmpresaServer: idEmpresa
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na requisição.');
            }
        })
        .then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            for (var i = 0; i < resposta.length; i++) {
                var registroId = resposta[i].idComponente;
                var registroValor = resposta[i].valor;
                vetoridComponentes.push(registroId);
                vetorValor.push(registroValor);
            }
            console.log(vetoridComponentes);
            console.log(vetorValor);
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function obterDadosGraficos() {
    obterDadosGrafico(idMaquina, 'grafico_cpu');
    obterDadosGraficoRAM(idMaquina, 'grafico_ram');
}

function obterDadosGrafico(idMaquina, chartId) {

    const labels = [];
    const data = [];

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Uso',
                data: data,
                fill: false,
                borderColor: '#845ED7',
                backgroundColor: '#845ED7',
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'white',
                        lineWidth: 0.1,
                        borderDash: [1, 1]
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'white',
                        lineWidth: 0.1,
                        borderDash: [1, 1]
                    },
                    ticks: {
                        callback: (value) => value + '%',
                        color: 'white'
                    }
                }
            },
            layout: {
                padding: {
                    left: 0
                }
            }
        }
    };

    const myChart = new Chart(document.getElementById(chartId), config);

    function atualizarGrafico() {
        fetch(`/medidas/tempo-real/${idMaquina}`, { cache: 'no-store' })
            .then((response) => {

                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Nenhum dado encontrado ou erro na API');
                }
            })
            .then((novoRegistro) => {
                const momento = new Date(novoRegistro[0].momento_grafico).toISOString().slice(11, 19);
                if (momento !== labels[labels.length - 1]) {
                    labels.shift();
                    labels.push(momento);
                    data.shift();
                    data.push(novoRegistro[0].cpu);
                    myChart.update();
                }
                setTimeout(atualizarGrafico, 4000);
            })
            .catch((error) => {
                console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
                setTimeout(atualizarGrafico, 4000);
            });
    }

    fetch(`/medidas/ultimas/${idMaquina}`, { cache: 'no-store' })
        .then((response) => {
            console.log("aaaa")
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
                const momentoFormatado = new Date(registro.momento_grafico).toISOString().slice(11, 19);

                labels.push(momentoFormatado);
                data.push(registro.cpu);
            }
            myChart.update();
            setTimeout(atualizarGrafico, 4000);
        })
        .catch((error) => {
            console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
        });

}

function obterDadosGraficoRAM(idMaquina, chartId) {

    const labels = [];
    const data = [];

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Uso',
                data: data,
                fill: false,
                borderColor: '#845ED7',
                backgroundColor: '#845ED7',
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'white',
                        lineWidth: 0.1,
                        borderDash: [1, 1]
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'white',
                        lineWidth: 0.1,
                        borderDash: [1, 1]
                    },
                    ticks: {
                        callback: (value) => value + '%',
                        color: 'white'
                    }
                }
            },
            layout: {
                padding: {
                    left: 0
                }
            }
        }
    };

    const myChart = new Chart(document.getElementById(chartId), config);

    function atualizarGraficoRAM() {
        fetch(`/medidas/tempo-real-ram/${idMaquina}`, { cache: 'no-store' })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Nenhum dado encontrado ou erro na API');
                }
            })
            .then((novoRegistro) => {

                const totalRAMGB = vetorValor[2]
                console.log(totalRAMGB)
                const usoRAMGB = novoRegistro[0].ram;

                const usoRAMPercent = (usoRAMGB / totalRAMGB) * 100;

                const momento = new Date(novoRegistro[0].momento_grafico).toISOString().slice(11, 19);
                if (momento !== labels[labels.length - 1]) {
                    labels.shift();
                    labels.push(momento);
                    data.shift();
                    data.push(usoRAMPercent);
                    myChart.update();
                }
                setTimeout(atualizarGraficoRAM, 4000);
            })
            .catch((error) => {
                console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
                setTimeout(atualizarGraficoRAM, 4000);
            });
    }

    fetch(`/medidas/ultimas-ram/${idMaquina}`, { cache: 'no-store' })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na requisição.');
            }
        })
        .then((resposta) => {
            resposta.reverse();
            for (const registro of resposta) {
                console.log(resposta)
                console.log(registro)

                const horaRegistro = new Date(registro.momento_grafico).toISOString().slice(11, 19);

                const registroFormatado = {
                    momento_grafico: horaRegistro,
                    ram: registro.ram,
                };

                labels.push(registroFormatado.momento_grafico);
                data.push(registroFormatado.ram);
            }
            myChart.update();
            setTimeout(atualizarGraficoRAM, 4000);
        })
        .catch((error) => {
            console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
        });

}

function buscarDadosMonitoramento(idMaquina, idEmpresa) {

    function buscarCpu(idMaquina, idEmpresa) {
        fetch("/medidas/buscarCpu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMaquinaServer: idMaquina,
                idEmpresaServer: idEmpresa
            })
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    cpu.innerHTML = `${resposta[0].dado}%`
                    barra_cpu.value = Number(resposta[0].dado).toFixed(2)
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }

    function buscarRam(idMaquina, idEmpresa) {
        fetch("/medidas/buscarRam", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMaquinaServer: idMaquina,
                idEmpresaServer: idEmpresa
            })
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    var ramAtual = resposta[0].dado
                    console.log(ramAtual)
                    var ramTotal = vetorValor[2]
                    console.log(ramTotal)

                    porcentagemUsoRam = Number((ramAtual / ramTotal) * 100).toFixed(2)

                    ram.innerHTML = `${porcentagemUsoRam}%`
                    barra_ram.value = porcentagemUsoRam

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }

    function buscarDisco(idMaquina, idEmpresa) {
        fetch("/medidas/buscarDisco", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMaquinaServer: idMaquina,
                idEmpresaServer: idEmpresa
            })
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    var discoAtual = resposta[0].dado
                    var discoTotal = vetorValor[1]
                    discoTotal = Number(discoTotal).toFixed(2);

                    console.log(discoAtual)
                    console.log(discoTotal)
                    porcentagemUsoDisco = Number((discoAtual / discoTotal) * 100).toFixed(2)

                    disco.innerHTML = `${porcentagemUsoDisco}%`
                    barra_disco.value = porcentagemUsoDisco


                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }
    function buscarUsb(idMaquina, idEmpresa) {
        fetch("/medidas/buscarUsb", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMaquinaServer: idMaquina,
                idEmpresaServer: idEmpresa
            })
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    usb.innerHTML = `Quantidade: ${resposta[0].dado}`

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }
    function buscarDownload(idMaquina, idEmpresa) {
        fetch("/medidas/buscarDownload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMaquinaServer: idMaquina,
                idEmpresaServer: idEmpresa
            })
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    download.innerHTML = ` ${resposta[0].dado}mb/s`

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }
    function buscarUpload(idMaquina, idEmpresa) {
        fetch("/medidas/buscarUpload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMaquinaServer: idMaquina,
                idEmpresaServer: idEmpresa
            })
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {


                    upload.innerHTML = ` ${resposta[0].dado}mb/s`


                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }
    function buscarJanelas(idMaquina, idEmpresa) {
        fetch("/medidas/buscarJanelas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMaquinaServer: idMaquina,
                idEmpresaServer: idEmpresa
            })
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    janelas.innerHTML = ` ${resposta[0].dado}`

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }
    function buscarProcessos(idMaquina, idEmpresa) {
        fetch("/medidas/buscarProcessos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMaquinaServer: idMaquina,
                idEmpresaServer: idEmpresa
            })
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    processos.innerHTML = ` ${resposta[0].dado}`

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }

    function buscarLogin(idMaquina, idEmpresa) {
        fetch("/medidas/buscarLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMaquinaServer: idMaquina,
                idEmpresaServer: idEmpresa
            })
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    console.log(resposta[0])
                    nome_funcionario.innerHTML = resposta[0].NomeFuncionario
                    id_maquina.innerHTML = resposta[0].idComputador
                    atividade.innerHTML = resposta[0].Atividade
                    inicio_turno.innerHTML = resposta[0].HoraInicioTurno

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }
    
    function atualizarCorBarra() {

        var barraCpu = document.getElementById('barra_cpu')
        var barraRam = document.getElementById('barra_ram')
        var barraDisco = document.getElementById('barra_disco')

        for (let i = 0; i < 3; i++) {
            var barra = ""
            switch (i) {
                case 0:
                    barra = barraCpu;
                    break;
                case 1:
                    barra = barraRam;
                    break;
                case 2:
                    barra = barraDisco;
                    break;
            }
            var valor = barra.value
            console.log(barra.id)
            if (valor <= 25) {
                barra.setAttribute('name', 'verde')
            } else if (valor >= 75) {
                barra.setAttribute('name', 'vermelho')
            } else {
                barra.setAttribute('name', 'laranja')
            }
        }        
    }

    buscarCpu(idMaquina, idEmpresa)
    buscarRam(idMaquina, idEmpresa)
    buscarDisco(idMaquina, idEmpresa)
    buscarUsb(idMaquina, idEmpresa)
    buscarDownload(idMaquina, idEmpresa)
    buscarUpload(idMaquina, idEmpresa)
    buscarLogin(idMaquina, idEmpresa)
    buscarJanelas(idMaquina, idEmpresa)
    buscarProcessos(idMaquina, idEmpresa)
    atualizarCorBarra()
}


setInterval(function () {
    buscarDadosMonitoramento(idMaquina, idEmpresa);
}, 2000); 