const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel')

const Bookshelf = sequelize.define('Bookshelf', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
    },
    author_name: {
        type: DataTypes.STRING,
    },
    cover_i: {
        type: DataTypes.STRING,
    },
    first_publish_year: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'bookshelf',
    timestamps: false,
});

User.hasMany(Bookshelf, { foreignKey: 'user_id' });
Bookshelf.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Bookshelf;
