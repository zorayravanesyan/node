"use strict"

// modelname,file misht mecatar
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'books',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    Book.associate = function(models){
        Book.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };

    return Book;
};