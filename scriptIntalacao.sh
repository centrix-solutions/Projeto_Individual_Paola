#!/bin/bash
# Função para verificar e instalar dependências
install_dependency() {
  if ! command -v $1 &> /dev/null; then
    echo -e "\n[Centrix Bot]: $1 não encontrado. Instalando..."
    sudo apt install -y $1
  else
    echo -e "\n[Centrix Bot]: $1 já está instalado."
  fi
}

# Instalar Java
install_dependency "openjdk-17-jre"

# Instalar Python
install_dependency "python"

# Instalar bibliotecas do Python
install_dependency "python3-pip"
install_dependency "python3-dev"
install_dependency "libmysqlclient-dev"

# Instalar pacotes do Python
pip3 install mysql-connector-python psutil speedtest-cli pymssql

# Instalar Docker
install_dependency "docker.io"

# Verificar se o Docker está iniciado e habilitar para iniciar no boot
if sudo systemctl is-active --quiet docker; then
  echo -e "\n[Centrix Bot]: Docker já está iniciado."
else
  echo -e "\n[Centrix Bot]: Iniciando serviço do Docker..."
  sudo systemctl start docker
fi

if sudo systemctl is-enabled --quiet docker; then
  echo -e "\n[Centrix Bot]: Docker configurado para iniciar junto ao sistema."
else
  echo -e "\n[Centrix Bot]: Habilitando Docker para iniciar junto ao sistema..."
  sudo systemctl enable docker
fi

# Criar e configurar o container do MySQL
echo -e "\n[Centrix Bot]: Criando e configurando o container do MySQL..."
sudo docker pull mysql:5.7
sudo docker run -d -p 3306:3306 --name ContainerBD -e "MYSQL_DATABASE=centrix" -e "MYSQL_ROOT_PASSWORD=urubu100" mysql:5.7

sleep 10

# Executar comandos SQL
echo -e "\n[Centrix Bot]: Executando comandos SQL..."
sudo docker exec -it ContainerBD bash -c "mysql -u root -p'urubu100' -e 'CREATE DATABASE IF NOT EXISTS centrix; USE centrix; CREATE TABLE IF NOT EXISTS Monitoramento (idMonitoramento INT primary key auto_increment, Data_captura DATE, Hora_captura TIME, Dado_Capturado DECIMAL(10,2), fkCompMonitorados INT, fkCompMoniExistentes INT, fkMaqCompMoni INT, fkEmpMaqCompMoni INT); CREATE TABLE IF NOT EXISTS Login (idLogin INT primary key auto_increment, Email VARCHAR(45), Atividade VARCHAR(255), Id_do_dispositivo CHAR(16), dataHoraEntrada DATETIME, dataHoraSaida DATETIME);'"

echo -e "\n[Centrix Bot]: Clonando o repositório com o JAR..."
git clone https://github.com/Centrix-Solutions-Grupo-07/Projeto_Individual_Paola.git

if [ $? -eq 0 ]; then
  echo -e "\n[Centrix Bot]: Clonagem bem-sucedida."
else
  echo -e "\n[Centrix Bot]: Falha ao clonar o repositório."
  exit 1
fi

echo -e "[Desktop Entry]
Name=CentrixApp
Comment=Atalho para executar o JAR
Exec=lxterminal -e 'bash -c \"java -jar ~/Desktop/Projeto_Individual_Paola/centrixMonitoramento-1.0-SNAPSHOT-jar-with-dependencies.jar; read -p Pressione Enter para continuar\"'
Type=Application
Terminal=true
" > ~/Desktop/executar-jar.desktop

chmod +x ~/Desktop/executar-jar.desktop

echo -e "\n[Centrix Bot]: Atalho para executar o JAR criado na área de trabalho."

echo -e "\n[Centrix Bot]: Instalação concluída com sucesso!"


echo -e "\n[Centrix Bot]: Instalação concluída com sucesso!"