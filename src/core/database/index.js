import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import config from '../config';

const { database, user, password, host, dialect } = config.dataBase;

export const mongoDataBase = mongoose.connect(
    `${config.dataBase.dialect}://${config.dataBase.host}/${config.dataBase.database}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log("Conexão com MongoDb realizado com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDb não foi realizado com sucesso: " + erro);
});

export const mysqlDataBase = new Sequelize(
    database,
    user,
    password,
    { host, dialect }
);

export const testeConexao = () => {
    sequelize.authenticate()
        .then(() => {
            console.log("Conexão com banco de dados realizada com sucesso!");
        }).catch((erro) => {
            console.log("Erro: Conexão com banco de dados não realizada com sucesso!");
        });
}


