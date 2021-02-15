const authService=require('../services/authService');

async function login(req,res){
    try{
       // console.log("data in con is :",req.body);
        const result=await authService.login(req.body);
        return res.send(result);
    }catch(err){
        res.status(500).send(err.stack);
    }
}

async function getToken(req,res){
    try{
      
        const result=await authService.getToken(req.body);
        console.log("result in conn :",result);
        return res.send(result);
    }catch(err){
        res.status(500).send(err.stack);
    }
}

async function logout(req,res){
    try{
        console.log("data in con is :",req.body);
        const result=await authService.logout(req.body);
        return res.send(result);
    }catch(err){
        res.status(500).send(err.stack);
    }
}

async function getSalt(req,res){
    try{
      
        const result=await authService.getSalt(req.body);
        const obj={"salt":result};
        return res.status(200).send(obj);
    }catch(err){
        res.status(500).send(err.stack);
    }
}
module.exports={login,getToken,logout,getSalt};