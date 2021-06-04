import mongoose from 'mongoose';
import sequelize from 'sequelize';

class DataBase {

    constructor() {
        this.mongoDataBase();
    }

    mongoDataBase() {
        mongoose.connect('mongodb://localhost/sac', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Conexão com MongoDb realizado com sucesso!");
        }).catch((erro) => {
            console.log("Erro: Conexão com MongoDb não foi realizado com sucesso: " + erro);
        });
    }

    mysqlDataBase() {
        mysql2.createConnection(
            {
                host: 'localhost',
                port: '3306',
                user: 'root',
                password: '',
                database: 'sac',
            });
        console.log("Conexão com MySQL2 realizado com sucesso!");
    }
}

export default new DataBase();