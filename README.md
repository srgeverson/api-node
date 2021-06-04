# SAC - Sistema de Atendimento ao CLiente
Este sistema servirá para acompanhar e gerenciar os atendimentos dos clientes.

## 📌 Versão ainda em produção
1.0.0

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/) 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

💡Esta aplicação usa um tokem gerado pelo [MD5 Hash Generator](https://passwordsgenerator.net/md5-hash-generator/).

## 🚀 Como o projeto foi desenvolvido

```bash

### Criar o arquivo package.json
$ npm init -y

### Gerencia as requisições, rotas e URLs, entre outra funcionalidades
$ npm install express

### Reiniciar o servidor sempre que houver alteração no código fonte
$ npm install -D nodemon

### Produz código JS válido - para import do ES6
$ npm install -D sucrase

### Banco de Dados MongoDB
$ npm install --save mongodb

### Banco de Dados MySQL2
$ npm install --save mysql2

### Mongoose traduz os dados do banco de dados para objetos JavaScript para que possam ser utilizados por sua aplicação.
$ npm install --save mongoose

### Mongoose traduz os dados do banco de dados para objetos JavaScript para que possam ser utilizados por sua aplicação.
$ npm install --save sequelize

### Validar campos
$ npm install -S yup

### Criptografar a senha
$ npm install --save bcryptjs

### Validar requisições com JWT
$ npm install --save jsonwebtoken

### Instalar o módulo para paginação com mongoose
$ npm install --save mongoose-paginate-v2

### Multer é um middleware node.js para manipulação multipart/form-data, usado para o upload de arquivos. 
$ npm install --save multer

### Permitir acesso a API
$ npm install --save cors

### Envio de email
$  npm install --save  nodemailer

```

#### 🎲 Rodando a aplicação

```bash
### Realizando o Backup
$ mongodump --db sac --out Pasta a ser salvo

### Restaurando o banco de dados
$ mongorestore --db sac Pasta onde o aquivo está salvo

### Instalar as dependencias
$ npm install

### Iniciar o servidor
$ npm rum dev

```

## 👨‍💻 Equipe de Desenvolvimento

* **Geverson Souza** - [Geverson Souza](https://linkedin.com.br/)

## ✒️ Autor

* **Ivitech Tecnologia** - [Ivitech Tecnologia](https://ivitech.com.br/)