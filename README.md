# Interpretador-de-AFDs

Apartir de um .json que representa o automato e um .txt que representa as palavras, vamos te devolver se as palavras foram aceitas ou não

## Instalação
Com o git já instalado, clone o projeto em sua máquina
```bash
git clone https://github.com/vinicimdohs/Interpretador-de-AFDs.git
```

## Node
O projeto é desenvolvido em node.js então para instalação do mesmo utilizaremos o [nvm](https://github.com/nvm-sh/nvm) para instalação. 
Com o nvm instalado e adcionado ao seu path, rode o seguinte comando para setar o node.
```bash
# instala o node 16.4.2
nvm install 16.4.2
# verifica se a versão foi instalada
nvm ls
# aponta para o node
nvm use 16.4.2
# verifica se está apontado
nvm ls
```

## Utilizando o programa
Dentro da pasta do programa abra o seu terminal e rode o seguinte comando
```bash
node index.js pathing.json pathing.txt
```
Lembre-se de substituir os pathings pelo caminho dos seus arquivos e caso tiver um \ troque por \\
