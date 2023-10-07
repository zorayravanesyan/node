"use strict"

// modelname,file misht mecatar
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'users',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    User.associate = function(models){
        User.hasMany(models.Book, {
            foreignKey: 'user_id',
            as: 'book'
        });
    };
   
    return User;
};