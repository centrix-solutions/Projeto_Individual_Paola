import psutil
import time
from mysql.connector import connect

cnx = connect(user='root', password='38762', host='localhost', database='centrix')

while(True):

    CPU1 = round(psutil.cpu_percent(),2)
    CPU2 = round(1.10*CPU1,2)
    CPU3 = round(CPU2*0.95,2)

    RAM1 = round(psutil.virtual_memory()[2],2)    
    RAM2 = round(1.15*RAM1,2)
    RAM3 = round(RAM2*0.05,2)

    DISK1 = round(psutil.disk_usage('/').percent,2)
    DISK2 = round(DISK1*0.95,2)
    DISK3 = round(DISK2*3,2)

    cursor = cnx.cursor()

    dados_CPU_PC_01 = [CPU1]

    add_leitura_CPU = ("INSERT INTO Leitura"
                   "(DadosCapturados, FKComponente)"
                   "VALUES (%s,1)")
    
    cursor.execute(add_leitura_CPU, dados_CPU_PC_01)

    dados_RAM_PC_01 = [RAM1]

    add_leitura_RAM = ("INSERT INTO Leitura"
                   "(DadosCapturados, FKComponente)"
                   "VALUES (%s,2)")
    
    cursor.execute(add_leitura_RAM, dados_RAM_PC_01)

    dados_DISCO_PC_01 = [DISK1]

    add_leitura_DISK = ("INSERT INTO Leitura"
                   "(DadosCapturados, FKComponente)"
                   "VALUES (%s,3)")
    
    cursor.execute(add_leitura_DISK, dados_DISCO_PC_01)

    dados_CPU_PC_02 = [CPU2]

    add_leitura_CPU = ("INSERT INTO Leitura"
                   "(DadosCapturados, FKComponente)"
                   "VALUES (%s,4)")
    
    cursor.execute(add_leitura_CPU, dados_CPU_PC_02)

    dados_RAM_PC_02 = [RAM2]

    add_leitura_RAM = ("INSERT INTO Leitura"
                   "(DadosCapturados, FKComponente)"
                   "VALUES (%s,5)")
    
    cursor.execute(add_leitura_RAM, dados_RAM_PC_02)

    dados_DISCO_PC_02 = [DISK2]

    add_leitura_DISK = ("INSERT INTO Leitura"
                   "(DadosCapturados, FKComponente)"
                   "VALUES (%s,6)")
    
    cursor.execute(add_leitura_DISK, dados_DISCO_PC_02)

    dados_CPU_PC_03 = [CPU3]

    add_leitura_CPU = ("INSERT INTO Leitura"
                   "(DadosCapturados, FKComponente)"
                   "VALUES (%s,7)")
    
    cursor.execute(add_leitura_CPU, dados_CPU_PC_03)

    dados_RAM_PC_03 = [RAM3]

    add_leitura_RAM = ("INSERT INTO Leitura"
                   "(DadosCapturados, FKComponente)"
                   "VALUES (%s,8)")
    
    cursor.execute(add_leitura_RAM, dados_RAM_PC_02)

    dados_DISCO_PC_03 = [DISK3]

    add_leitura_DISK = ("INSERT INTO Leitura"
                   "(DadosCapturados, FKComponente)"
                   "VALUES (%s,9)")
    
    cursor.execute(add_leitura_DISK, dados_DISCO_PC_03)

    cnx.commit()

    time.sleep(5)

