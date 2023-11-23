import psutil
import time
from mysql.connector import connect

cnx = connect(user='root', password='38762', host='localhost', database='centrix')

while(True):

    CPU = round(psutil.cpu_percent(), 2)

    RAM = round(psutil.virtual_memory().used / (1024**3), 3)
    
    DISK = round(psutil.disk_usage('/').used / (1024**3), 3)

    bd = cnx.cursor()

    #CPU
    dados_CPU_PC = [CPU, 1, 1, 1, 1]

    add_leitura_CPU = ("INSERT INTO Monitoramento"
                       "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                       "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")

    bd.execute(add_leitura_CPU, dados_CPU_PC)
    
    #RAM
    dados_RAM_PC = [RAM, 2, 3, 1, 1]

    add_leitura_RAM = ("INSERT INTO Monitoramento"
                       "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                       "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
    

    bd.execute(add_leitura_RAM, dados_RAM_PC)
    
    #DISK
    dados_DISK_PC = [DISK, 3, 2, 1, 1]

    add_leitura_DISK = ("INSERT INTO Monitoramento"
                        "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                        "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
    
    bd.execute(add_leitura_DISK, dados_DISK_PC)
    cnx.commit()

    time.sleep(5)