"use strict"


module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'products',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    Product.associate = function(models){
        Product.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };

    return Product;
};
