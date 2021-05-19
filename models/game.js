import Sequelize from 'sequelize';

// Fixed COMPILATION ERROR: Game model was not exported
export default sequelize =>
  sequelize.define('game', {
    title: {
      type: Sequelize.STRING(25),
      allowNull: false,
    },

    owner_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    studio: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    esrb_rating: {
      type: Sequelize.CHAR(5),
      allowNull: false,
    },

    user_rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },

    have_played: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
