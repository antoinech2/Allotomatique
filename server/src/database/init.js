import Sequelize from 'sequelize';

export default async function init(){
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'data/database.sqlite',
        logging: false
      });
    
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }


    const AlloDB = sequelize.define('Allo', {
        // Model attributes are defined here
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        listeId: {
          type: Sequelize.STRING,
          allowNull: false
        },
        name : {
          type: Sequelize.STRING,
          allowNull: false
        },
        description : {
          type: Sequelize.STRING,
          allowNull: true
        },

      }, {});

      const CommandeDB = sequelize.define('Commande', {
        // Model attributes are defined here
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        listeId : {
          type: Sequelize.STRING,
          allowNull: false
        },
        alloId: {
          type: Sequelize.STRING,
          allowNull: false
        },
        client : {
          type: Sequelize.STRING,
          allowNull: false
        },
        adress : {
          type: Sequelize.STRING,
          allowNull: true
        },
        phone : {
          type: Sequelize.STRING,
          allowNull: true
        },
        infos : {
            type: Sequelize.STRING,
            allowNull: true
          },
        status : {
          type: Sequelize.ENUM('PENDING', 'WAITING', 'WAITING_NOT_CONFIRMED', 'DELIVERED', 'CANCELED'),
          allowNull: false,
        },
        date_demande : {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        date_commande : {
          type: Sequelize.DATE,
          allowNull: true,
        },
        date_livraison : {
          type: Sequelize.DATE,
          allowNull: true
        },

      }, {});

      //await AlloDB.sync({ force: true });
      //await CommandeDB.sync({ force: true });

    return {connection : sequelize, allo : AlloDB, commande : CommandeDB};
}
