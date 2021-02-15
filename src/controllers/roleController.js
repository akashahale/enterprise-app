const roleService=require('../services/roleService');
const { sendErrorRsp} = require('api-rsp');

//create role with permissions
async function createRole(req,res){
    try{
        const result=await roleService.createRole(req.body);
        return res.status(201).send("Role created successfully.");
    }catch(err){
        res.status(500).send(err.stack);
    }
}

//list roles
async function getRoles(req, res) {
    try {
        const result = await roleService.getRole();
        return res.send(result);
        } catch (err) {
            res.status(500).send(err.stack);
    }
}
//update role
async function updateRole(req, res) {
    try {
        const result = await roleService.updateRole(req.body);
        return res.status(200).send('Role updated successfully');
        } catch (err) {
           return sendErrorRsp(res, {
           code: 'Get_Role_FAILED',
           message: 'Unable to get roles',
           httpCode: 500,
        });
    }
}

//get role by id
async function getRoleById(req,res){
    try {
        const result = await roleService.getRoleById(req.params.role_id);
        return res.send(result);
        } catch (err) {
            res.status(500).send(err.stack);
    }
}

//delete role
async function deleteRoleById(req,res){
    try {
        const result = await roleService.deleteRoleById(req.params.role_id);
          return res.status(200).send('Role deleted successfully');
        } catch (err) {
            res.status(500).send(err.stack);
    }
}

module.exports={createRole,getRoles,updateRole,getRoleById,deleteRoleById};