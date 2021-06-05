import Sequelize from 'sequelize';
import { mysqlDataBase } from '../../core/database';

const Usuario = mysqlDataBase.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    recuperarSenha: {
        type: Sequelize.STRING,
        allowNull: true
    },
    foto: {
        type: Sequelize.BOOLEAN,
        required: true
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        required: true
    },
});

Usuario.sync();

export default Usuario;