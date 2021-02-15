const db=require('../models');
const { v4: uuidv4 } = require('uuid');
const Roles=db.Roles;
const Permissions=db.Permissions;

//create role with permissions
async function createRole(data){
    var uuid=uuidv4();
    console.log("enterprise_code is :",uuid);
    if(data.name ==='admin'){
        const result =await Roles.create({
            name:data.name,
            description:data.description,
            enterprise_code:data.uuid,
            status:data.status,
            createdAt: new Date(),
            updatedAt: new Date(),
          }, 
          {
              include:['permissions']
          } 
          );
        result.setPermissions(data.permission_id);
          return result;
      } else{
        const result =await Roles.create({
            name:data.name,
            description:data.description,
            enterprise_code:uuid,
            status:data.status,
            createdAt: new Date(),
            updatedAt: new Date(),
          }, 
          {
              include:['permissions']
          } 
          );
        result.setPermissions(data.permission_id);
          return result;
      }
    }
    
//Gives us list all roles
async function getRole(){
    const result = await Roles.findAll(
        {
            attributes:['role_id', 'name', 'description', 'status'],
           
            include:[{ model:Permissions, as: 'permissions' ,attributes:['permission_id', 'name', 'description', 'status'],through:{attributes:[]}}]
        }
    )
  
    return result;
}

//update role
async function updateRole(data){
    
    const result = await Roles.update(
        {
            name: data.name,
            description: data.description,
            enterpriseCode:uuidv4(),
            status:data.status,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            where: {
                role_id: data.role_id,
              },include:['permissions']
        }
    );
    return successObject({ result: result });
}

//get role by id
async function getRoleById(role_id){
    const result =await Roles.findByPk(role_id,{
        attributes:['role_id', 'name', 'description', 'status'],
           
            include:[{ model:Permissions, as: 'permissions' ,attributes:['permission_id', 'name', 'description', 'status'],through:{attributes:[]}}],
        where:{
            role_id:role_id,
        }
    })
    return result; 
}
//delete role by id
async function deleteRoleById(role_id){
    console.log("inside del service");
    const result =await Roles.destroy({
        where:{
            role_id:role_id,
        },
        include:[{ model:Permissions, as: 'permissions'}]
     } )
    return result; 
}

module.exports={createRole,getRole,updateRole,getRoleById,deleteRoleById};