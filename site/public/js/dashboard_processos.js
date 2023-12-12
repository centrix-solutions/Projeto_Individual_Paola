function toggleInfo(id, seta) {
    var conteudoInfo = document.getElementById(id);
    if (conteudoInfo.style.display === 'none') {
        conteudoInfo.style.display = 'block';
        document.getElementById(seta).innerHTML = '&#9650;';  // Seta para cima
    } else {
        conteudoInfo.style.display = 'none';
        document.getElementById(seta).innerHTML = '&#9660;';  // Seta para baixo
    }
}
async function listarProcessos(pesquisa) {
    var idEmpresa = sessionStorage.Empresa;
    var idAndar = (andares.value).split('-')[1];
    var filtro = chkFiltro.checked;
    var count = [];
    if (idAndar == 0 || idAndar == undefined) idAndar = null;
    try {
        var resposta = await fetch("/processos/listarProcessos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idEmpresaServer: idEmpresa,
                idAndarServer: idAndar,
                filtroServer: filtro,
                pesquisaServer: pesquisa
            })
        });
        if (resposta.ok) {
            var respostaJson = await resposta.json();
            console.log('JSON PROCESSOS: ', respostaJson);

            for (let b = 0; b < 2; b++) {
                if (b == 0) {
                    var listaComputadores = document.getElementById('listaComputadores');
                } else {
                    var listaComputadores = document.getElementById('listaComputadoresFiltro');
                }
                listaComputadores.innerHTML = "";
                var arrayIdComputador = [];
                var arrayDadoCabecalho = [];
                
                var tituloProcessosDiferentes = [];
                var dadosProcessosDiferentes = [];
                
                for (let i = 0; i < respostaJson.length; i++) {
                    if (arrayIdComputador.indexOf(respostaJson[i].idMaquina) == -1) {
                        arrayIdComputador.push(respostaJson[i].idMaquina);
                        var vetor = [];
                        vetor.push(respostaJson[i].Id_do_dispositivo);
                        vetor.push(respostaJson[i].email);
                        arrayDadoCabecalho.push(vetor);
                    }                    
                }
                if (b == 0) {
                    arrayIdComputador.forEach(i => {
                        var divComputador = document.createElement('div');
                        divComputador.className = 'computador';
                        
                        var divCabecalho = document.createElement('div');
                        var spanComputador = document.createElement('span');
                        var spanPessoa = document.createElement('span');
                        var spanSeta = document.createElement('span');
                        spanSeta.id = `seta1-${i}`;
                        divCabecalho.className = 'cabecalho';
                        divCabecalho.id = `computador-${i}`;
                        divCabecalho.addEventListener('click', function () {
                            var idMaquina = (this.id).split('-')[1];
                            toggleInfo(`conteudoInfoProcessos-${idMaquina}`, `seta1-${idMaquina}`);
                        });
                        var posicao = arrayIdComputador.indexOf(i);
                        spanComputador.innerHTML = arrayDadoCabecalho[posicao][0];
                        spanPessoa.innerHTML = arrayDadoCabecalho[posicao][1];
                        spanSeta.innerHTML = "&#9660;";
                        
                        var divConteudo = document.createElement('div');
                        var divDeletar = document.createElement('div');
                        var buttonDeletar = document.createElement('button');
                        
                        divConteudo.className = "conteudo";
                        divConteudo.id = `conteudoInfoProcessos-${i}`;
                        var contador = 0;
                        respostaJson.forEach(a => {
                            if (a.fkMaqProc == i) {
                                var divCheckBox = document.createElement('div');
                                var checkBoxProcesso = document.createElement('input');
                                var labelProcesso = document.createElement('label');
                                
                                checkBoxProcesso.type = "checkbox";
                                checkBoxProcesso.name = `chk-${a.idMaquina}`;
                                checkBoxProcesso.id = `chk-${a.idProcesso}`;
                                labelProcesso.innerHTML = a.titulo;
                                labelProcesso.for = `chk-${a.idMaquina}`;
                                
                                divCheckBox.appendChild(checkBoxProcesso);
                                divCheckBox.appendChild(labelProcesso);
                                divConteudo.appendChild(divCheckBox);
                            
                                if (tituloProcessosDiferentes.indexOf(a.titulo) == -1) {
                                    tituloProcessosDiferentes.push(a.titulo);
                                    var array = [arrayDadoCabecalho[posicao][0], arrayDadoCabecalho[posicao][1]];
                                    dadosProcessosDiferentes.push(array);
                                }
                                contador++;
                            }
                        });
                        count.push(contador);
                        divDeletar.className = "div-btn-deletar";
                        buttonDeletar.className = "btn-deletar cursor";
                        buttonDeletar.innerHTML = "Deletar Processos";
                        buttonDeletar.name = `btn-${i}`
                    
                        buttonDeletar.addEventListener('click', function () {
                            var idMaquina = (this.name).split('-')[1];
                            deletarProcessos(idMaquina);
                        });
                        
                        divCabecalho.appendChild(spanComputador);
                        divCabecalho.appendChild(spanPessoa);
                        divCabecalho.appendChild(spanSeta);
                        
                        divDeletar.appendChild(buttonDeletar);
                        divConteudo.appendChild(divDeletar);
                        
                        divComputador.appendChild(divCabecalho);
                        divComputador.appendChild(divConteudo);
                    
                        listaComputadores.appendChild(divComputador);
                    });
                    processosDiferentes(tituloProcessosDiferentes, dadosProcessosDiferentes);
                } else {
                    arrayIdComputador.forEach(i => {
                        var posicao = arrayIdComputador.indexOf(i);

                        var divCheckBox = document.createElement('div');
                        var checkbox = document.createElement('input');
                        var label = document.createElement('label');
                        
                        checkbox.type = "checkbox";
                        checkbox.name = `chkRelatorio`;
                        checkbox.id = `chkRelatorio-${i}`;
                        label.innerHTML = arrayDadoCabecalho[posicao][0];
                        label.for = `chkRelatorio-${i}`;
                        
                        divCheckBox.appendChild(checkbox);
                        divCheckBox.appendChild(label);

                        listaComputadores.appendChild(divCheckBox);
                    });
                }
            }
            sessionStorage.count = count;
        }
    } catch (erro) {
        console.log("Erro Processos: ", erro);
    }
}
function processosDiferentes(titulos, dados) {
    var listaProcessosDiferentes = document.getElementById('listaProcessosDiferentes');
    listaProcessosDiferentes.innerHTML = '';
    for (let i = 0; i < titulos.length; i++) {
        var divComputador = document.createElement('div');
        divComputador.className = "computador preto";

        var divCabecalho = document.createElement('div');
        var spanTitulo = document.createElement('span');
        var spanSeta = document.createElement('span');
        spanSeta.id = `seta2-${i}`
        spanTitulo.innerHTML = titulos[i];
        spanSeta.innerHTML = "&#9660;";
        
        divCabecalho.className = 'cabecalho';
        divCabecalho.id = `processoDiferente-${i}`;
        divCabecalho.addEventListener('click', function () {
            var idTitulo = (this.id).split('-')[1];
            toggleInfo(`conteudoInfoProcessosDiferentes-${idTitulo}`, `seta2-${idTitulo}`);
        });

        divCabecalho.appendChild(spanTitulo);
        divCabecalho.appendChild(spanSeta);

        var divConteudo = document.createElement('div');
        divConteudo.className = "conteudo";
        divConteudo.id = `conteudoInfoProcessosDiferentes-${i}`;

        var divInfo = document.createElement('div');
        var spanComputador = document.createElement('span');
        var spanPessoa = document.createElement('span');
        spanComputador.innerHTML = dados[i][0];
        spanPessoa.innerHTML = dados[i][1];

        divInfo.appendChild(spanComputador);
        divInfo.appendChild(spanPessoa);

        var divCopia = document.createElement('div');
        divCopia.className = 'div-copia';
        var divBalao = document.createElement('div');
        divBalao.classList.add('balao');
        divBalao.classList.add('hidden');
        divBalao.innerHTML = `id copiado: ${dados[i][0]}`;
        divBalao.id = `${dados[i][0]}-${i}`;
        var spanCopia = document.createElement('span');
        spanCopia.innerHTML = "Copiar id do computador &nbsp;&nbsp;&nbsp;";
        var iIcone = document.createElement('i');
        iIcone.className = "material-icons cursor";
        iIcone.innerHTML = "content_copy";
        iIcone.name = `${dados[i][0]}-${i}`;
        iIcone.addEventListener('click', function () {
            var Id_do_dispositivo = (this.name).split('-')[0];
            navigator.clipboard.writeText(Id_do_dispositivo);
            
            var idBalao = (this.name).split('-')[1];
            var balao = document.getElementById(`${Id_do_dispositivo}-${idBalao}`);
            balao.classList.remove('hidden');
            balao.style.opacity = 1;
            setTimeout(function() {
                balao.style.opacity = 0;
                balao.classList.add('hidden');
            }, 3000);
        });

        var linha = document.createElement('div');
        linha.className = 'linha';

        divCopia.appendChild(spanCopia);
        divCopia.appendChild(iIcone);
        
        divConteudo.appendChild(divBalao);
        divConteudo.appendChild(divInfo);
        divConteudo.appendChild(linha);
        divConteudo.appendChild(divCopia);

        divComputador.appendChild(divCabecalho);
        divComputador.appendChild(divConteudo);

        listaProcessosDiferentes.appendChild(divComputador);
    }
}
async function deletarProcessos(idMaquina) {
    var chks = document.getElementsByName(`chk-${idMaquina}`);
    var processosParaDeletar = [];
    for (let i = 0; i < chks.length; i++) {
        if (chks[i].checked == true) {
            processosParaDeletar.push((chks[i].id).split('-')[1]);
        }
    }
    try {
        var resposta = await fetch("/processos/deletarProcessos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                processosParaDeletarServer: processosParaDeletar
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
function gerarRelatorio() {
    var modal = document.getElementById('divRelatorio');
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
}
window.onclick = function(event) {
    var modal = document.getElementById('divRelatorio');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
function SelecionarTodos() {
    var chks = document.getElementsByName('chkRelatorio');
    for (let i = 1; i <= chks.length; i++) {
        var checkbox = document.getElementById(`chkRelatorio-${i}`);
        checkbox.checked = true;
    }
}
setTimeout(() => {
    listarProcessos();
    var andares = document.getElementById('andares');
    andares.addEventListener("change", function () {
        listarProcessos();
    });
    var filtro = document.getElementById('chkFiltro');
    filtro.addEventListener("change", function () {
        listarProcessos();
    });
    var input = document.getElementById('inputPesquisa');
    input.addEventListener("input", function () {
        var input = document.getElementById('inputPesquisa');
        var pesquisa = input.value;
        listarProcessos(pesquisa);
    });
}, 1000);
