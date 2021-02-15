const permissionService=require('../services/permissionsService');
const { sendErrorRsp} = require('api-rsp');

async function listPermisions(req, res) {
    try {
        const result = await permissionService.getAllPermissions();
        return res.send(result);
        } catch (err) {
           res.status(500).send(err.stack);
    }
}

async function getPermissionsByFeature(req,res){
    try {
        const result = await permissionService.getPermissionsByFeature(req.query.feature);
        return res.send(result);
        } catch (err) {
           return sendErrorRsp(res, {
           code: 'List_ permission_FAILED',
           message: 'Unable to get permission',
           httpCode: 500,
        });
    }
}

module.exports={listPermisions,getPermissionsByFeature};