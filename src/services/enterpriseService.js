const db=require('../models');
const { v4: uuidv4 } = require('uuid');
const Role=require('./roleService');
const Users=require('./userService');
const pemissions=require('./permissionsService');
const users=db.Users;
const Roles=db.Roles;
const Enterprise=db.Enterprise;
const Permissions=db.Permissions;
async function getAllPermissionsId(){
    const finalResult=await Permissions.findAll({
        attributes: ['permission_id'],
        });
        return finalResult;
}

//create enterprise
async function createEnterprise(data){
    var keys=Object.keys(data);
    var val=data.admin;
    var roleName=keys[1];
    var uuid=uuidv4();
    const result=await Enterprise.create({ 
        name:data.name,
        enterprise_code:uuid, 
        createdAt: new Date(),
        updatedAt: new Date(),

    })
    const permission_id=await getAllPermissionsId();    
   val["roles"]=roleName;
   var role={};
   role['name']=roleName;
   role["uuid"]=uuid;
   role['permission_id']=permission_id;
   const roles= await Role.createRole(role);
   const user= await Users.createUser(val);
   return uuid;
}

// GET ENTERPRISE DETAILS
async function getEnterpriseDetails(){
    var object={};
    var  preArr=[];
    const result = await Enterprise.findAll();
    const fres=JSON.parse(JSON.stringify(result))
    for(let element of fres){
        var e_code=element.enterprise_code;
    }
    const userResult=await users.findAll({
        attributes:['id', 'name', 'username', 'emailId','enterprise_code','status'],
        include:[{model:Roles,as:'roles',attributes:['name'],through:{attributes:[]}}],
        where:{enterprise_code:e_code }
        });
    var userRes=JSON.parse(JSON.stringify(userResult))
    for(let element of userRes){
        for(let roleElement of element.roles){
         var roleName=roleElement.name;
         if(roleName === 'admin'){
            let permissions=await pemissions.getAllPermissionsName();
            let pm=JSON.parse(JSON.stringify(permissions));
        
            for(let element of pm)
            {
                preArr.push(element.name);
            }
        }
      element["roleNames"]=roleName;
      element['permissionNames']=preArr;
      delete element['roles'];
    }
  }
 object['admin']=userRes;
  result.push(object);
  return result;
}

//delete enterprise
async function deleteEnterprise(enterprise_id){

    const result =await Enterprise.destroy({
        where:{
            enterprise_id:enterprise_id
        }
     } )
     return result;
}

//Activate enterprise
async function activateEnterprise(id){
  
    const result=await Enterprise.update(
        {
            status:'Active'
        },
        {
            where:{
                enterprise_id:id,
            }
        }
    )
   return result;
}

//Suspend enterprise
async function suspendEnterprise(id){
    const result=await Enterprise.update({
        status:'Suspend'
    },
    {
        where:
        {
            enterprise_id:id,
        }
    }
    )
   return result;
}

module.exports={createEnterprise,getEnterpriseDetails,deleteEnterprise,activateEnterprise,suspendEnterprise}