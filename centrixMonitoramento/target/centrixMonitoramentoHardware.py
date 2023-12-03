import psutil
import time
import pymssql
from mysql.connector import connect
from datetime import datetime

mysql_cnx = connect(user='root', 
                    password='#Gf53359131851',
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
        "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
        "VALUES (%s, %s, %s, %s, %s, %s, %s)"
    )
    bdLocal_cursor.execute(add_leitura_CPU, 
                           (data_atual, 
                           hora_atual, 
                           CPU, 
                           1, 
                           1, 
                           1, 
                           1))

    # RAM
    add_leitura_RAM = (
        "INSERT INTO Monitoramento"
        "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
        "VALUES (%s, %s, %s, %s, %s, %s, %s)"
    )
    bdLocal_cursor.execute(add_leitura_RAM, 
                          (data_atual, 
                          hora_atual, 
                          RAM, 
                          2, 
                          3, 
                          1, 
                          1))

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
                           1, 
                           1, 
                           1))

    # RAM
    bdServer_cursor.execute(add_leitura_RAM, 
                           (str(data_atual), 
                           str(hora_atual), 
                           RAM, 
                           2, 
                           3, 
                           1, 
                           1))
    
    bdServer_cursor.close()

    sql_server_cnx.commit()

    time.sleep(10)
