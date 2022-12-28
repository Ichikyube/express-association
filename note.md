To install the Sequelize CLI:

npm install --save-dev sequelize-cli

To create an empty project you will need to execute init command

npx sequelize-cli init

This will create following folders

config, contains config file, which tells CLI how to connect with database
models, contains all models for your project
migrations, contains all migration files
seeders, contains all seed files

Let's create a model named User.

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string


This will:

Create a model file user in models folder;
Create a migration file with name like XXXXXXXXXXXXXX-create-user.js in migrations folder.

npx sequelize-cli db:migrate

This command will execute these steps:

Will ensure a table called SequelizeMeta in database. This table is used to record which migrations have run on the current database
Start looking for any migration files which haven't run yet. This is possible by checking SequelizeMeta table. In this case it will run XXXXXXXXXXXXXX-create-user.js migration, which we created in last step.
Creates a table called Users with all columns as specified in its migration file.


You can use db:migrate:undo, this command will revert the most recent migration.

npx sequelize-cli db:migrate:undo

You can revert back to the initial state by undoing all migrations with the db:migrate:undo:all command. You can also revert back to a specific migration by passing its name with the --to option.

npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js



Let's create a seed file which will add a demo user to our User table.

npx sequelize-cli seed:generate --name demo-user

Now we should edit this file to insert demo user to User table.

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};


npx sequelize-cli db:seed:all

This will execute that seed file and a demo user will be inserted into the User table.

Note: Seeder execution history is not stored anywhere, unlike migrations, which use the SequelizeMeta table. If you wish to change this behavior, please read the Storage section.


If you wish to undo the most recent seed:

npx sequelize-cli db:seed:undo

If you wish to undo a specific seed:

npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data

If you wish to undo all seeds:

npx sequelize-cli db:seed:undo:all



The following skeleton shows a typical migration file.

module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
  }
}

We can generate this file using migration:generate. This will create xxx-migration-skeleton.js in your migration folder.

npx sequelize-cli migration:generate --name migration-skeleton

The passed queryInterface object can be used to modify the database. The Sequelize object stores the available data types such as STRING or INTEGER. Function up or down should return a Promise. Let's look at an example:

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Person', {
      name: Sequelize.DataTypes.STRING,
      isBetaMember: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Person');
  }
};

The following is an example of a migration that performs two changes in the database, using an automatically-managed transaction to ensure that all instructions are successfully executed or rolled back in case of failure:

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Person', 'petName', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Person', 'favoriteColor', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Person', 'petName', { transaction: t }),
        queryInterface.removeColumn('Person', 'favoriteColor', { transaction: t })
      ]);
    });
  }
};


The next example is of a migration that has a foreign key. You can use references to specify a foreign key:

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Person', {
      name: Sequelize.DataTypes.STRING,
      isBetaMember: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Person');
  }
}

The next example is of a migration that uses async/await where you create an unique index on a new column, with a manually-managed transaction:

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Person',
        'petName',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await queryInterface.addIndex(
        'Person',
        'petName',
        {
          fields: 'petName',
          unique: true,
          transaction,
        }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Person', 'petName', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};

The next example is of a migration that creates an unique index composed of multiple fields with a condition, which allows a relation to exist multiple times but only one can satisfy the condition:

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Person', {
      name: Sequelize.DataTypes.STRING,
      bool: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      }
    }).then((queryInterface, Sequelize) => {
      queryInterface.addIndex(
        'Person',
        ['name', 'bool'],
        {
          indicesType: 'UNIQUE',
          where: { bool : 'true' },
        }
      );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Person');
  }
}