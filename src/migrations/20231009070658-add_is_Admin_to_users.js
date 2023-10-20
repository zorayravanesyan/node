'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'is_admin',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false, 
          defaultValue: false
        }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'is_admin'),
    ]);
  }
};