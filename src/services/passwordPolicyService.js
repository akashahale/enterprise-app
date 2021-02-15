const db=require('../models');
const { v4: uuidv4 } = require('uuid');
const Password_Policy=db.Password_Policy;

async function createPasswordPolicy(data){
    var uuid=uuidv4();
    const result =await Password_Policy.create({
        policy_name:data.policy_name,
        enterprise_code:uuid,
        description:data.description,
        minPasswordLength:data.minPasswordLength,
        minLowerAlphaChars:data.minLowerAlphaChars,
        minUpperAlphaChars:data.minUpperAlphaChars,
        minNumericalChars:data.minNumericalChars,
        minSpecialChars:data.minSpecialChars,
        passwordHistoryLength:data.passwordHistoryLength,
        specialChars:data.specialChars,
        passwordAge : data.passwordAge,
        status:data.status,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return result;
}

//get password policy details
async function getPasswordPolicies(){
    const result=await Password_Policy.findAll();
    return result;
}

// UPDATE PASSWORD POLICY
async function updatePasswordPolicy(id,data){
    const result =await Password_Policy.update({
        policy_name:data.policy_name,
        description:data.description,
        minPasswordLength:data.minPasswordLength,
        minLowerAlphaChars:data.minLowerAlphaChars,
        minUpperAlphaChars:data.minUpperAlphaChars,
        minNumericalChars:data.minNumericalChars,
        minSpecialChars:data.minSpecialChars,
        passwordHistoryLength:data.passwordHistoryLength,
        specialChars:data.specialChars,
        passwordAge : data.passwordAge,
        status:data.status,
        updatedAt: new Date(),
    },
    {
        where:{
            id:id
        }
    });
    return result;
}

// ACTIVATE PASSWORD POLICY BY IDENTIFIER
async function activatePasswordPolicy(id){
    const result =await Password_Policy.update({
        status:"active",
        updatedAt: new Date(),
    },
    {
        where:{
            id:id
        }
    });
    return result;
}

// DEACTIVATE PASSWORD POLICY BY IDENTIFIER
async function deactivatePasswordPolicy(id){
    const result =await Password_Policy.update({
        status:"inactive",
        updatedAt: new Date(),
    },
    {
        where:{
            id:id
        }
    });
    return result;
}

// DELETE PASSWORD POLICY BY IDENTIFIER
async function deletePasswordPolicy(id){
    const result =await Password_Policy.destroy({
        where:{
            id:id
        }
    });
    return result;
}
module.exports={createPasswordPolicy,getPasswordPolicies,updatePasswordPolicy,activatePasswordPolicy,deactivatePasswordPolicy,deletePasswordPolicy};