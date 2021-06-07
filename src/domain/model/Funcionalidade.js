import Sequelize from 'sequelize';
import { mysqlDataBase } from '../../core/database';

const Funcionalidade = mysqlDataBase.define('funcionalidades', {
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
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        required: true,
        defaultValue: true
    },
}, {
    timestamps: false
});

Funcionalidade.sync();

export default Funcionalidade;