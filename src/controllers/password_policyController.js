const passwordPolicyService=require('../services/passwordPolicyService');

async function createPasswordPolicy(req,res){
   
    try{
        const result =await passwordPolicyService.createPasswordPolicy(req.body);
        return res.status(201).send("Password policy created successfully.");
    }catch(err){
        res.status(500).send(err.stack);
    }
}

async function getPasswordPolicies(req,res){
    try{
        const result =await passwordPolicyService.getPasswordPolicies();
        return res.send(result);
    }catch(err){
        res.status(500).send(err.stack);
    }
}
    
async function updatePasswordPolicy(req,res){
   
    try{
        const result =await passwordPolicyService.updatePasswordPolicy(req.params.id,req.body);
        return res.status(200).send("Password policy updated successfully.");
    }catch(err){
        res.status(500).send(err.stack);
    }
}

async function activatePasswordPolicy(req,res){
   
    try{
        const result =await passwordPolicyService.activatePasswordPolicy(req.params.id);
        return res.status(200).send("Password Policy activated.");
    }catch(err){
        res.status(500).send(err.stack);
    }
}
async function deactivatePasswordPolicy(req,res){
   console.log("id is :",req.params.id);
    try{
        const result =await passwordPolicyService.deactivatePasswordPolicy(req.params.id);
        return res.status(200).send("Password policy deactivated .");
    }catch(err){
        res.status(500).send(err.stack);
    }
}

async function deletePasswordPolicy(req,res){
    try{
        const result =await passwordPolicyService.deletePasswordPolicy(req.params.id);
        return res.status(200).send("Password policy deleted .");
    }catch(err){
        res.status(500).send(err.stack);
    }
}
   
module.exports={createPasswordPolicy, getPasswordPolicies,updatePasswordPolicy,activatePasswordPolicy,deactivatePasswordPolicy,deletePasswordPolicy};