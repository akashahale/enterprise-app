const db=require('../models');
const Users=db.Users;
const Roles=db.Roles;
const USER_ACTIVATION_KEY=db.USER_ACTIVATION_KEY;
const pemissions=require('./permissionsService');
var crypto = require('crypto');
const sequelize = require('sequelize');
var moment = require('moment');
const Op=sequelize.Op;

//generate random string
async function genRandomString (length){
    return crypto.randomBytes(Math.ceil(length/2)) .toString('hex').slice(0,length);  
};

//Gives us hashed password
 async function sha512(password, salt){
    var hash = crypto.createHmac('sha512', salt); // Hashing algorithm sha512 
    hash.update(password);
    var value = hash.digest('hex');
    return  value;
};

async function saltHashPassword(userpassword) {
    var salt = await genRandomString(16); // Gives us salt of length 16 
    var passwordData = await sha512(userpassword, salt);
    return {
        salt:salt,
        passwordHash:passwordData
    };
}

//Gives us role id by name 
async function getRoleIdbyName(data){ 
 if(data.roles === 'admin')
 {
    const result =await Roles.findOne(
        {
          where: { name: data.roles},
        });
        return result;
 }else{
    const result =await Roles.findOne(
        {
          where: { name: data.roles[0]},
        });
    return result;
 } 
}

//Gives us role name by roleId
async function getRoleNameById(id){ 
    const result =await Roles.findAll(
        { 
          attributes:['name'],
          where: { role_id: id},
        }
    );
   return result;
   }
   

//Create user with role
async function createUser(data){
    const roleDetails=await getRoleIdbyName(data);   
    const result=await Users.create(
        {
            name:data.name,
            username:data.username,
            emailId:data.emailId,
            enterprise_code:roleDetails.enterprise_code, 
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            include:['roles'],
        }
    )
   const activateUser=await activationKeyDetails(result.id);
    result.setRoles(roleDetails.role_id);

    return result;
}

//list all users
async function listUsers(){
    var obj={};
    let arr=[];
    let permissionArr=[]
    const result=await Users.findAll({
        attributes:['id', 'name', 'username', 'emailId','enterprise_code','status'],
        include:[{model:Roles,as:'roles',attributes:['role_id', 'name','status'],through:{attributes:[]}}],
        }
    );
    const fres=JSON.parse(JSON.stringify(result));
     for(var ele1 of fres){   
     arr.push(ele1);
      var abc =ele1.roles;
      for (let ele of abc){
        let roleName=await getRoleNameById(ele.role_id);
        ele1["roleNames"]=roleName;
         if(ele.name === 'admin'){
            let permissions=await pemissions.getAllPermissionsName();
            let pm=JSON.parse(JSON.stringify(permissions));
        
            for(let element of pm)
            {
                permissionArr.push(element.name);
            }
            ele1["permissionsNames"]=permissionArr;
         }else{
            let permissions=await pemissions.getPermissionsByFeature(ele.name);
            ele1["permissionsNames"]=permissions;
         }
    }
}
    obj["users"]=arr;
    return obj;
}

//Delete user
async function deleteUser(user_id){
    const result =await Users.destroy({
        where:{
            id:user_id,
        },
        include:[{ model:Roles, as: 'roles'}]
     } )
}

//Gives us user activation key details
async function activationKeyDetails(userId){
    const key=await genRandomString(8);
   const result=await USER_ACTIVATION_KEY.create({
            user_id:userId,
            activation_key:key,
            expiry_date:new Date(new Date().setHours(23, 59, 59, 999)),
            createdAt: new Date(),
            updatedAt: new Date(),
   });
   return result;
}

//Activate user
async function activateUser(user_id){
    const result=await Users.update(
        {
            status:'Active'
        },
        {
            where:{
                id:user_id,
            }
        }
    )
   return result;
}

//Suspend user
async function suspendUser(userId){
    const result=await Users.update({
        status:'Suspend'
    },
    {
        where:
        {
            id:userId,
        }
    }
    )
   return result;
}

//Gives us user activation key
async function getActvationKey(user_id){
    const result =await USER_ACTIVATION_KEY.findOne({
        attributes:['activation_key'],
        where:{
            user_id:user_id
        }
    })
    return result;
}

//Activate user by token
async function activateUserByToken(activationKey,data){
    const result =await USER_ACTIVATION_KEY.findOne({
        attributes:['user_id','expiry_date'],
        where:{
            activation_key:activationKey
        }
    })
   if(Date.now()< result.expiry_date){
            const saltPassword=await saltHashPassword(data.newPassword);  
            console.log("saltPassword is :",saltPassword)   ;
            const userResult=await Users.update(
                {
                password:saltPassword.passwordHash,
                salt:saltPassword.salt,
            },{
                where:{
                    id:result.user_id
            }
        });
    }
    else
    {
          return "invalid activation token.";
    }
    return "User activated successfully.";   
    }

//Change password 
async function changPassword(data){
    const result=await Users.findOne({
        attributes:['id'],
        where:{
            password:data.password
        }
    });
    if(result){
        const saltPassword=await saltHashPassword(data.newPassword);  
        const userResult=await Users.update(
            {
            password:saltPassword.passwordHash,
            salt:saltPassword.salt,
        },{
            where:{
                id:result.id
        }
    });
    }else{
        return "Entered password is incorrect."
    }
    return "password changed sucessfully."
}

//forgot password
async function forgotPassword(data){
    const result=await Users.findOne({
        attributes:['id'],
        where:{
            username:data.username
        }
    });
    if(result){
        const key=await genRandomString(8);
        const keyResult =await USER_ACTIVATION_KEY.update({
            activation_key:key,
            expiry_date:new Date(new Date().setHours(23, 59, 59, 999)),
        },{
            where:{
                user_id:result.id
             }
        }
        )
    }
    return "Activation key generated.";
}

//Gives us loggedin user details
async function getLoggedInUserDetails(){
    var obj={};
    let arr=[];
    let preArr=[]
    const result=await Users.findAll({
        where:{
            last_login_date: {
                [Op.lt]: moment(new Date()).format(
                    'YYYY-MM-DD HH:mm'
                ),
            },
        },
       attributes:['id', 'name', 'username', 'emailId','enterprise_code','status'],
       include:[{model:Roles,as:'roles',attributes:['role_id', 'name','status'],through:{attributes:[]}}],
        }
    );
    const fres=JSON.parse(JSON.stringify(result));
     for(var ele1 of fres){   
     arr.push(ele1);
      var abc =ele1.roles;
      for (let ele of abc){
        let roleName=await getRoleNameById(ele.role_id);
        ele1["roleNames"]=roleName;
         if(ele.name === 'admin'){
            let permissions=await pemissions.getAllPermissionsName();
            let pm=JSON.parse(JSON.stringify(permissions));
        
            for(let element of pm)
            {
                preArr.push(element.name);
            }
            ele1["permissionsNames"]=preArr;
         }else{
            let permissions=await pemissions.getPermissionsByFeature(ele.name);
            ele1["permissionsNames"]=permissions;
         }
    }
}
    obj["users"]=arr;
    return obj;
}

module.exports={createUser,listUsers,deleteUser,getRoleNameById,activateUser, suspendUser,activateUserByToken,changPassword,forgotPassword,getLoggedInUserDetails,getActvationKey};