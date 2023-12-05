import com.github.britooo.looca.api.core.Looca
import Conexao.bancoSenha
import Conexao.bancoUser
import java.io.File
object scriptPadraoPython {

    var pythonProcesses: List<Process> = listOf()

    fun criarScript(tempo: Int, idMaquinaDado: Int, idEmpresaDado: Int): String {

        val codigoPythonDefaultHard = """
        import psutil
        import time
        import pymssql
        from mysql.connector import connect
        from datetime import datetime

        mysql_cnx = connect(user='$bancoUser', 
                            password='$bancoSenha',
                            host='localhost',
                            database='centrix')

        sql_server_cnx = pymssql.connect(server='44.197.21.59', 
                                     database='centrix', 
                                     user='sa', 
                                     password='centrix')

        while True:
            
            data_e_hora_atuais = datetime.now()
            data_atual = data_e_hora_atuais.date()
            hora_atual = data_e_hora_atuais.time()

            CPU = round(psutil.cpu_percent(), 2)
            RAM = round(psutil.virtual_memory().used / (1024**3), 3)

            bdLocal_cursor = mysql_cnx.cursor()

            # BD Local
            
            # CPU
            add_leitura_CPU = (
                "INSERT INTO Monitoramento"
                "(Data_captura, Hora_captura, Dado_Capturado, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                "VALUES (%s, %s, %s, %s, %s, %s)"
            )
            bdLocal_cursor.execute(add_leitura_CPU, 
                                   (data_atual, 
                                   hora_atual, 
                                   CPU,  
                                   1, 
                                   $idMaquinaDado, 
                                   $idEmpresaDado))

            # RAM
            add_leitura_RAM = (
                "INSERT INTO Monitoramento"
                "(Data_captura, Hora_captura, Dado_Capturado, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                "VALUES (%s, %s, %s, %s, %s, %s)"
            )
            bdLocal_cursor.execute(add_leitura_RAM, 
                                  (data_atual, 
                                  hora_atual, 
                                  RAM, 
                                  3, 
                                  $idMaquinaDado, 
                                  $idEmpresaDado))

            bdLocal_cursor.close()

            mysql_cnx.commit()

            bdServer_cursor = sql_server_cnx.cursor()

            # BD Server
            
            # CPU
            bdServer_cursor.execute(add_leitura_CPU, 
                                   (str(data_atual), 
                                   str(hora_atual), 
                                   CPU, 
                                   1, 
                                   $idMaquinaDado, 
                                   $idEmpresaDado))

            # RAM
            bdServer_cursor.execute(add_leitura_RAM, 
                                   (str(data_atual), 
                                   str(hora_atual), 
                                   RAM, 
                                   3, 
                                   $idMaquinaDado, 
                                   $idEmpresaDado))
            
            bdServer_cursor.close()

            sql_server_cnx.commit()

            time.sleep(10)

    """.trimIndent()


        val nomeArquivoPyDefaultHard = "centrixMonitoramentoHardware.py"
        File(nomeArquivoPyDefaultHard).writeText(codigoPythonDefaultHard)

        Thread.sleep(2 * 1000L)

        return nomeArquivoPyDefaultHard

    }

    val looca = Looca()
    val so = looca.sistema.sistemaOperacional

    fun executarScript(arquivo1: String) {

        val pythonProcess1: Process

        if (so.contains("Win")) {
            pythonProcess1 = Runtime.getRuntime().exec("py $arquivo1")
        } else {
            pythonProcess1 = Runtime.getRuntime().exec("python3 $arquivo1")
        }

        pythonProcesses = listOf(pythonProcess1)
    }

    fun pararScript() {
        for (process in pythonProcesses) {
            process.destroyForcibly()
        }
    }
}