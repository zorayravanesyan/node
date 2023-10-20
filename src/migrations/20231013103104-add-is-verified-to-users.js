'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'is_verified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'is_verified');
  }
};
