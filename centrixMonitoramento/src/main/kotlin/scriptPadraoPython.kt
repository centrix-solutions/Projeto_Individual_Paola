import Conexao.bancoSenha
import Conexao.bancoUser
import java.io.File

object scriptPadraoPython {

    var pythonProcesses: List<Process> = listOf()

    fun criarScript(tempo: Int, idMaquinaDado: Int, idEmpresaDado: Int): Pair<String, String> {

        val codigoPythonDefaultHard = """
        import psutil
        import time
        import pymssql
        from mysql.connector import connect
        from datetime import datetime

        mysql_cnx = connect(user='$bancoUser', password='$bancoSenha', host='localhost', database='centrix')

        sql_server_cnx = pymssql.connect(server='44.197.21.59', database='centrix', user='sa', password='centrix')

        ""${'"'}
        slack_token = 'xoxb-5806834878417-6181633164562-0EX9fmOdmK2bMxTgymgx1Soq'
        slack_channel = '#notificação'
        slack_client = WebClient(token=slack_token)
        ""${'"'}

        limite_cpu = 30  # Métricas CPU, RAM e Disco
        limite_ram = 4
        limite_disco = 100

        while True:
            
            data_e_hora_atuais = datetime.now()
            data_atual = data_e_hora_atuais.date()
            hora_atual = data_e_hora_atuais.time()

            CPU = round(psutil.cpu_percent(), 2)
            RAM = round(psutil.virtual_memory().used / (1024**3), 3)
            DISK = round(psutil.disk_usage('/').used / (1024**3), 3)

            ""${'"'}
            if CPU > limite_cpu:
                message = f"Aviso: Uso de CPU acima do limite! ({CPU}%)"
                slack_client.chat_postMessage(channel=slack_channel, text=message)

            if RAM > limite_ram:
                message = f"Aviso: Uso de RAM acima do limite! ({RAM} GB)"
                slack_client.chat_postMessage(channel=slack_channel, text=message)

            if DISK > limite_disco:
                message = f"Aviso: Uso de Disco acima do limite! ({DISK} GB)"
                slack_client.chat_postMessage(channel=slack_channel, text=message)
            ""${'"'}

            bdLocal_cursor = mysql_cnx.cursor()

            # BD Local
            
            # CPU
            add_leitura_CPU = (
                "INSERT INTO Monitoramento"
                "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                "VALUES (%s, %s, %s, %s, %s, %s, %s)"
            )
            bdLocal_cursor.execute(add_leitura_CPU, (data_atual, hora_atual, CPU, 1, 1, $idMaquinaDado, $idMaquinaDado))

            # RAM
            add_leitura_RAM = (
                "INSERT INTO Monitoramento"
                "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                "VALUES (%s, %s, %s, %s, %s, %s, %s)"
            )
            bdLocal_cursor.execute(add_leitura_RAM, (data_atual, hora_atual, RAM, 2, 3, $idMaquinaDado, $idMaquinaDado))

            # DISK
            add_leitura_DISK = (
                "INSERT INTO Monitoramento"
                "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                "VALUES (%s, %s, %s, %s, %s, %s, %s)"
            )
            bdLocal_cursor.execute(add_leitura_DISK, (data_atual, hora_atual, DISK, 3, 2, $idMaquinaDado, $idMaquinaDado))
            bdLocal_cursor.close()

            mysql_cnx.commit()

            bdServer_cursor = sql_server_cnx.cursor()

            # BD Server
            
            # CPU
            bdServer_cursor.execute(add_leitura_CPU, (str(data_atual), str(hora_atual), CPU, 1, 1, $idMaquinaDado, $idMaquinaDado))

            # RAM
            bdServer_cursor.execute(add_leitura_RAM, (str(data_atual), str(hora_atual), RAM, 2, 3, $idMaquinaDado, $idMaquinaDado))

            # DISK
            bdServer_cursor.execute(add_leitura_DISK, (str(data_atual), str(hora_atual), DISK, 3, 2, $idMaquinaDado, $idMaquinaDado))
            
            bdServer_cursor.close()

            sql_server_cnx.commit()

            time.sleep(10)

    """.trimIndent()

        val codigoPythonDefaultRede = """
            import speedtest as st
            import time
            from mysql.connector import connect
            import pymssql
            from datetime import datetime

            cnx = connect(user='$bancoUser', password='${bancoSenha}', host='localhost', database='centrix')
            speed_test = st.Speedtest()

            sql_server_cnx = pymssql.connect(server='44.197.21.59', database='centrix', user='sa', password='centrix');

            while(True):
                download = speed_test.download()
                download_mbs = round(download / (10**6), 2)
                
                upload = speed_test.upload()
                upload_mbs = round(upload / (10**6), 2)
                
                data_e_hora_atuais = datetime.now()
                data_atual = data_e_hora_atuais.date()
                hora_atual = data_e_hora_atuais.time()
                
                bd = cnx.cursor()
                bdServer_cursor = sql_server_cnx.cursor()
                
                #DOWNLOAD
                dados_DOWNLOAD_PC = [download_mbs, 4, 5, $idMaquinaDado, $idEmpresaDado]

                add_leitura_DOWNLOAD = ("INSERT INTO Monitoramento"
                                   "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                                   "VALUES (%s, %s, %s, %s, %s, %s, %s)")
                

                bd.execute(add_leitura_DOWNLOAD, (data_atual, hora_atual, download_mbs, 4, 5, $idMaquinaDado, $idEmpresaDado))
                bdServer_cursor.execute(add_leitura_DOWNLOAD, (str(data_atual), str(hora_atual), download_mbs, 4, 5, $idMaquinaDado, $idEmpresaDado))
                
                #UPLOAD
                dados_UPLOAD_PC = [upload_mbs, 5, 6, $idMaquinaDado, $idEmpresaDado]

                add_leitura_UPLOAD = ("INSERT INTO Monitoramento"
                                   "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                                   "VALUES (%s, %s, %s, %s, %s, %s, %s)")
                

                bd.execute(add_leitura_UPLOAD, (data_atual, hora_atual, upload_mbs, 5, 6, $idMaquinaDado, $idEmpresaDado))

                bdServer_cursor.execute(add_leitura_UPLOAD, (str(data_atual), str(hora_atual), upload_mbs, 5, 6, $idMaquinaDado, $idEmpresaDado))

                
                cnx.commit()
                sql_server_cnx.commit()
                bdServer_cursor.close()

            time.sleep(20)

    """.trimIndent()


        val nomeArquivoPyDefaultHard = "centrixMonitoramentoHardware.py"
        File(nomeArquivoPyDefaultHard).writeText(codigoPythonDefaultHard)

        Thread.sleep(2 * 1000L)

        val nomeArquivoPyDefaultRede = "centrixMonitoramentoRede.py"
        File(nomeArquivoPyDefaultRede).writeText(codigoPythonDefaultRede)

        return Pair(nomeArquivoPyDefaultHard, nomeArquivoPyDefaultRede)

    }

    fun executarScript(arquivo1: String, arquivo2: String) {
        val pythonProcess1 = Runtime.getRuntime().exec("py $arquivo1")
        val pythonProcess2 = Runtime.getRuntime().exec("py $arquivo2")
        pythonProcesses = listOf(pythonProcess1, pythonProcess2)
    }

    fun pararScript() {
        for (process in pythonProcesses) {
            process.destroyForcibly()
        }
    }
}