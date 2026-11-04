const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../instances/mysql');

class Cotacao extends Model {}

Cotacao.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigoIn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valorCompra: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false,
    },
    valorVenda: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false,
    },
    dataCotacao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Cotacao',
    tableName: 'Cotacao',
    timestamps: true,
});

module.exports = Cotacao;