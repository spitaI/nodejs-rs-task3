import Sequelize from 'sequelize';

export default sequelize =>
  sequelize.define('user', {
    full_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    passwordHash: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  });
