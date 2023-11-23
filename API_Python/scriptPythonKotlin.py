import speedtest as st
import psutil
import time
from mysql.connector import connect

cnx = connect(user='root', password='38762', host='localhost', database='centrix')
speed_test = st.Speedtest()

while(True):

    CPU = round(psutil.cpu_percent(), 2)

    RAM = round(psutil.virtual_memory().used / (1024**3), 3)
    
    DISK = round(psutil.disk_usage('/').used / (1024**3), 3)
    
    download = speed_test.download()
    download_mbs = round(download / (10**6), 2)
    
    upload = speed_test.upload()
    upload_mbs = round(upload / (10**6), 2)
    
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
    
    
    
    #DOWNLOAD
    dados_DOWNLOAD_PC = [download_mbs, 4, 5, 1, 1]

    add_leitura_DOWNLOAD = ("INSERT INTO Monitoramento"
                       "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                       "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
    

    bd.execute(add_leitura_DOWNLOAD, dados_DOWNLOAD_PC)
    
    #UPLOAD
    dados_UPLOAD_PC = [upload_mbs, 5, 6, 1, 1]

    add_leitura_UPLOAD = ("INSERT INTO Monitoramento"
                       "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                       "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
    

    bd.execute(add_leitura_UPLOAD, dados_UPLOAD_PC)
    cnx.commit()

    time.sleep(2)