const enterpriseService=require('../services/enterpriseService');
 
async function createEnterprise(req,res){
     try{
        const result=await enterpriseService.createEnterprise(req.body); 
        let obj ={ 
            "message":"Enterprise created successfully.",
            "enterprice_code":result,
            "applicationErrorCode": 0
    }
    return res.status(201).send(obj);
    }catch(err){
        res.status(500).send(err.stack);
    }
}

async function getEnterpriseDetails(req,res){
    try{
        const result=await enterpriseService.getEnterpriseDetails(); 
       return res.status(200).send(result);
    }catch(err){
        res.status(500).send(err.stack);
    }
}

async function deleteEnterprise(req, res) {
    let obj=
    {
        "message": "Enterprise deleted successfully.",
        "applicationErrorCode": 0
    }
    try {
        const result = await enterpriseService.deleteEnterprise(req.params.id);
        return res.status(200).send(obj); 
        } catch (err) {
           res.status(500).send(err.stack);
    }
}

async function activateEnterprise(req,res){
    let obj=
    {
        "message": "Enterprise Activated successfully.",
        "applicationErrorCode": 0
    }
    try {
        const result = await enterpriseService.activateEnterprise(req.params.id);
        return res.status(200).send(obj);
        } catch (err) {
           res.status(500).send(err.stack);
    }
}
async function suspendEnterprise(req,res){
    let obj=
    {
        "message": "Enterprise Activated successfully.",
        "applicationErrorCode": 0
    }
    try {
        const result = await enterpriseService.suspendEnterprise(req.params.id);
        return res.status(200).send(obj);
        } catch (err) {
           res.status(500).send(err.stack);
    }
}
module.exports={createEnterprise,getEnterpriseDetails,deleteEnterprise,activateEnterprise,suspendEnterprise};