const db=require('../models');
const Sequelize=require('sequelize');
const Permissions=db.Permissions;

//get all permission
async function getAllPermissions(){
    var obj={};
const result=await Permissions.findAll({
    attributes: [Sequelize.fn('DISTINCT', Sequelize.col('feature')) ,'feature'],
});

for(let element of result){
    const finalResult=await Permissions.findAll({
    attributes: ['permission_id', 'name', 'description', 'status'],
     where: { feature: element.feature },
    });

    obj[`${element.feature}`]=finalResult;
}
 
let fobj=JSON.parse(JSON.stringify(obj));
    return  fobj; 
}

//get permissions by feature

async function getPermissionsByFeature(feature){ 
    var obj={};
    let arr=[];
    const result =await Permissions.findAll(
        {
            attributes:['name'],
           where: { feature:feature },
        },
        {
            include:['roles']
        }
    );

   const fres=JSON.parse(JSON.stringify(result));
   for(let val of fres){
   arr.push(val.name);
     }

   obj[feature]=arr;    
    return obj;
   }
   //get all permission Name
   async function getAllPermissionsName(){
    const finalResult=await Permissions.findAll({
        attributes: ['name'],
        });
        return finalResult;
}
   module.exports={getAllPermissions,getPermissionsByFeature,getAllPermissionsName};