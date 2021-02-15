'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('permissions',
    [
        {
            name:'user_add',
            description:'Add User',
            feature:'user',
            status:'A',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
          name:'user_update',
          description:'update user details',
          feature:'user',
          status:'A',
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
        name:'user_delete',
        description:'delete user details',
        feature:'user',
        status:'A',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
      {
        name:'user_fetch',
        description:'fetch user details',
        feature:'user',
        status:'A',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
      name: 'role_add',
      description:'Add role to user',
      feature:'role',
      status:'A',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  {
    name: 'role_update',
    description:'update role of user',
    feature:'role',
    status:'A',
    createdAt: new Date(),
    updatedAt: new Date(),
},
{
  name:'role_fetch',
  description:'fetch role details',
  feature:'role',
  status:'A',
  createdAt: new Date(),
  updatedAt: new Date(),
},

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
