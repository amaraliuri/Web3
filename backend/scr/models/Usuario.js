const {DataTypes, Model} = require('sequelize');
const { sequelize } = require('../instances/mysql');

class Usuario extends Model {}

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
    perfil: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'usuario',
    },
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuario',
    timestamps: true,
    defaultScope: {
        attributes: { exclude: ['senha'] },
    },
    scopes:{
        comSenha:{
            attributes: { include: ['senha'] }
        }
    }
});

module.exports = Usuario;