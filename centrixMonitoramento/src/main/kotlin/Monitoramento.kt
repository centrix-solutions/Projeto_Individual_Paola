import com.github.britooo.looca.api.core.Looca
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.ZoneId
import java.util.*
import kotlin.concurrent.thread
import kotlin.system.exitProcess

class Monitoramento {

    fun inicioMoni() {

        val looca = Looca()
        val sn = Scanner(System.`in`)
        val usuarioLogado = Usuario()
        val repositorioUser = UsuarioRepositorio()
        val repositorioMaquina = MaquinaRepositorio()
        val repositorioComponentes = ComponentesRepositorio()
        val repositorioMonitoramento = MonitoramentoRepositorio()


        repositorioUser.iniciar()
        repositorioMaquina.iniciar()
        repositorioComponentes.iniciar()
        repositorioMonitoramento.iniciar()
        var idEmpresa: Int = 0

        /* INICIO LOGIN */
        while (true) {
            while (true) {
                println(
                    " ██████╗███████╗███╗   ██╗████████╗██████╗ ██╗██╗  ██╗                   \n" +
                            "██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔══██╗██║╚██╗██╔╝                   \n" +
                            "██║     █████╗  ██╔██╗ ██║   ██║   ██████╔╝██║ ╚███╔╝                    \n" +
                            "██║     ██╔══╝  ██║╚██╗██║   ██║   ██╔══██╗██║ ██╔██╗                    \n" +
                            "╚██████╗███████╗██║ ╚████║   ██║   ██║  ██║██║██╔╝ ██╗                   \n" +
                            " ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝                   \n" +
                            "                                                                         \n" +
                            "███████╗ ██████╗ ██╗     ██╗   ██╗████████╗██╗ ██████╗ ███╗   ██╗███████╗\n" +
                            "██╔════╝██╔═══██╗██║     ██║   ██║╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝\n" +
                            "███████╗██║   ██║██║     ██║   ██║   ██║   ██║██║   ██║██╔██╗ ██║███████╗\n" +
                            "╚════██║██║   ██║██║     ██║   ██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║\n" +
                            "███████║╚██████╔╝███████╗╚██████╔╝   ██║   ██║╚██████╔╝██║ ╚████║███████║\n" +
                            "╚══════╝ ╚═════╝ ╚══════╝ ╚═════╝    ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝"
                )

                println("-----login-----")
                println("")
                Thread.sleep(1 * 1000L)
                println("Digite o seu email:")
                val logarUsuarioEmail = sn.nextLine()
                println("")
                println("Digite sua senha:")
                Thread.sleep(2 * 1000L)
                val logarUsuarioSenha = sn.nextLine()
                println("")
                val autenticado = repositorioUser.autenticarLogin(logarUsuarioEmail, logarUsuarioSenha)

                if (autenticado) {
                    println("Login bem-sucedido!")
                    val user = repositorioUser.logarFuncionario(logarUsuarioEmail, logarUsuarioSenha)

                    usuarioLogado.idFuncionario = user.idFuncionario
                    usuarioLogado.nome = user.nome
                    usuarioLogado.email = user.email
                    usuarioLogado.senha = user.senha
                    usuarioLogado.fkEmpFunc = user.fkEmpFunc
                    usuarioLogado.fkNivelAcesso = user.fkNivelAcesso

                    idEmpresa = user.fkEmpFunc
                    println("Bem vindo ${usuarioLogado.nome}")
                    break
                } else {
                    println("Email ou senha incorretos. Tente novamente.")
                }
            }

            /* FIM LOGIN */

            /* INICIO VERIFICAÇÃO DE MAQUINA EXISTENTE */

            val id = looca.processador.id
            val verificacao = repositorioMaquina.autenticarMaquina(id)

            if (!verificacao) {
                println("")
                println("Essa máquina não existe na base de dados")
                Thread.sleep(1 * 1000L)
                println("Iniciando o cadastro.....")

                val novaMaquina = Maquina()

                novaMaquina.SO = looca.sistema.sistemaOperacional
                novaMaquina.idCPU = looca.processador.id
                novaMaquina.fkEmpMaq = usuarioLogado.fkEmpFunc

                repositorioMaquina.registrarMaquina(novaMaquina, usuarioLogado)
                val idMaquina: Int = repositorioComponentes.buscarIdMaqPorId(id)

                val valores = listOf(
                    100.0, //cpu 1
                    looca.grupoDeDiscos.tamanhoTotal.toDouble() / 1000000000, //disco 2
                    looca.memoria.total.toDouble() / 1000000000,//ram 3
                    looca.dispositivosUsbGrupo.totalDispositvosUsbConectados.toDouble(), //usb 4
                    0.0, // taxa_dowload 5
                    0.0, // taxa_upload 6
                    0.0, // janelas do sistema 7
                    0.0 // processos 8
                )
                val componentes = listOf(1, 2, 3, 4, 5, 6, 7, 8)

                for (i in 0 until valores.size) {
                    val valor = valores[i]
                    val fkComponente = componentes[i]
                    repositorioComponentes.registrarComponente(valor, fkComponente, idMaquina, novaMaquina)
                }

                println("Máquina cadastrada com monitoramento padrão.....")
                Thread.sleep(2 * 1000L)
            } else println("Essa máquina já foi cadastrada")
            println("")
            Thread.sleep(1 * 1000L)
            /* FIM VERIFICAÇÃO DE MAQUINA EXISTENTE */

            /* INICIO BUSCA DE DADOS, COMPONENTES E IDS */

            val idMaquina: Int = repositorioComponentes.buscarIdMaqPorId(id)
            val maquinaSpecs = Maquina()

            maquinaSpecs.SO = looca.sistema.sistemaOperacional
            maquinaSpecs.DISCO = looca.grupoDeDiscos.tamanhoTotal.toDouble() / 1000000000
            maquinaSpecs.idCPU = looca.processador.id
            maquinaSpecs.RAM = looca.memoria.total.toDouble() / 1000000000
            maquinaSpecs.CPU = looca.processador.nome

            val ram = maquinaSpecs.RAM
            val disco = maquinaSpecs.DISCO
            println(
                """
            Especificações do seu computador:
            ID: ${maquinaSpecs.idCPU}.
            SO: ${maquinaSpecs.SO}.
            CPU: ${maquinaSpecs.CPU}.
            RAM: %.2f GB.
            DISCO: %.2f GB.
            """.trimIndent().format(ram, disco)
            )
            val horaLogin = LocalDateTime.now()

            repositorioUser.registrarLogin(usuarioLogado, idMaquina, maquinaSpecs, horaLogin)

            val componentesExistentes: MutableList<String> = mutableListOf()
            val fkcomponentesMonitorados: MutableList<Int> = mutableListOf()
            val componentes: List<Int> = repositorioComponentes.buscarComponetesMaq(idMaquina)
            val nomeComponentes: List<String> =
                listOf("Cpu", "Disco", "Ram", "Usb", "Taxa Download", "Taxa Upload", "Janelas do Sistema", "Processos")
            componentes.forEach {
                componentesExistentes.add(nomeComponentes[it - 1])
                when (it) {
                    4 -> {
                        fkcomponentesMonitorados.add(repositorioComponentes.buscarIdComp(idEmpresa, idMaquina, it))
                    }

                    7 -> fkcomponentesMonitorados.add(repositorioComponentes.buscarIdComp(idEmpresa, idMaquina, it))
                    8 -> fkcomponentesMonitorados.add(repositorioComponentes.buscarIdComp(idEmpresa, idMaquina, it))
                }
            }

            /* FIM BUSCA DE DADOS, COMPONENTES E IDS */

            /* INICIO MONITORAMENTO */
            println("")
            val tempo = 10
            val (arquivo1, arquivo2) = scriptPadraoPython.criarScript(tempo, idMaquina, idEmpresa)
            println("Iniciando o monitoramento....")
            var opcaoMonitoramento = true

            scriptPadraoPython.executarScript(arquivo1, arquivo2)
            val MonitoramentoThread = thread {
                while (opcaoMonitoramento) {

                    val atividade = looca.grupoDeJanelas.janelas[3].titulo
                    repositorioUser.atualizarAtividade(usuarioLogado, idMaquina, atividade, horaLogin)

                    val dados: MutableList<Float> = mutableListOf(
                        //looca.processador.uso.toFloat(),
                        //looca.memoria.emUso.toFloat() / (1024 * 1024),
                        //looca.dispositivosUsbGrupo.totalDispositvosUsbConectados.toFloat(),
                        //looca.rede.grupoDeInterfaces.interfaces.get(0).bytesEnviados.toFloat() / (1024 * 1024),
                        //looca.rede.grupoDeInterfaces.interfaces.get(0).bytesRecebidos.toFloat() / (1024 * 1024),
                        //looca.grupoDeJanelas.totalJanelas.toFloat(),
                        //looca.grupoDeProcessos.totalProcessos.toFloat(),
                    )

                    val fkcomponentesExistentes: MutableList<Int> = mutableListOf()

                    if (componentesExistentes.contains("Usb")) {
                        val usb: Float = looca.dispositivosUsbGrupo.totalDispositvosUsbConectados.toFloat()
                        dados.add(usb)
                        fkcomponentesExistentes.add(4)
                        if (usb > 10) {
                            Notificacao().notificarUSB(usb)
                        }
                    }
                    if (componentesExistentes.contains("Janelas do Sistema")) {
                        val janelas: Float = looca.grupoDeJanelas.totalJanelas.toFloat()
                        dados.add(janelas)
                        fkcomponentesExistentes.add(7)
                        if (janelas > 10) {
                            Notificacao().notificarJanelas(janelas)
                        }
                    }
                    if (componentesExistentes.contains("Processos")) {
                        val processos: Float = looca.grupoDeProcessos.totalProcessos.toFloat()
                        dados.add(processos)
                        fkcomponentesExistentes.add(8)
                        if (processos > 10) {
                            Notificacao().notificarProcessos(processos)
                        }
                    }
                    for (i in dados.indices) {
                        val zonaFusoHorario = ZoneId.of("America/Sao_Paulo")
                        val data = LocalDate.now()
                        val hora = LocalTime.now(zonaFusoHorario)
                        val dado = dados[i]
                        val fkcompMoni = fkcomponentesMonitorados[i]
                        val fkcompExis = fkcomponentesExistentes[i]
                        repositorioMonitoramento.registrarDados(
                            data,
                            hora,
                            dado,
                            fkcompMoni,
                            fkcompExis,
                            idMaquina,
                            idEmpresa
                        )
                    }
                    Thread.sleep(tempo * 1000L)
                }
            }
            val MenuThread = thread {

                var opcaoMenu = true

                while (opcaoMenu) {
                    println(
                        """
            Digite....
            1-Trocar de usuário
            2-Encerrar o programa
        """.trimIndent()
                    )
                    val opcao = sn.nextInt()
                    when (opcao) {
                        1 -> {
                            opcaoMenu = false
                            opcaoMonitoramento = false
                            scriptPadraoPython.pararScript()

                            val horaLogout = LocalDateTime.now()
                            //  val datahj = LocalDateTime.now()

                            // val verificarData = repositorioUser.verificarLogin(usuarioLogado, idMaquina)

                            //  val diferencaEmDias = verificarData?.toLocalDate()?.until(datahj.toLocalDate())?.days

                            //  if (diferencaEmDias!! > 7){
                            //       repositorioUser.apagarLogs(usuarioLogado, idMaquina)
                            //    }
                            repositorioUser.registrarSaida(usuarioLogado, idMaquina, horaLogout)
                        }

                        2 -> {
                            println("Encerrando o programa...")

                            scriptPadraoPython.pararScript()
                            opcaoMonitoramento = false

                            //  val datahj = LocalDateTime.now()
                            val horaLogout = LocalDateTime.now()

                            //    val verificarData = repositorioUser.verificarLogin(usuarioLogado, idMaquina)

                            //    val diferencaEmDias = verificarData?.toLocalDate()?.until(datahj.toLocalDate())?.days

                            //    if (diferencaEmDias!! > 7){
                            //          repositorioUser.apagarLogs(usuarioLogado, idMaquina)
                            //      }

                            repositorioUser.registrarSaida(usuarioLogado, idMaquina, horaLogout)

                            exitProcess(0)
                        }

                        else -> {
                            println("Opção inválida. Por favor, escolha uma opção válida.")
                        }
                    }
                }
            }
            MonitoramentoThread.join()
            MenuThread.join()
        }
    }


}