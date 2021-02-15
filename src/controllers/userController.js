const userService=require('../services/userService');
//create user with role
async function createUser(req,res){
    try{
        const result=await userService.createUser(req.body);
        return res.status(201).send("User created successfully.");
    }catch(err){
        res.status(500).send(err.stack);
    }
}

//list all users
async function listUsers(req, res) {
    try {
        const result = await userService.listUsers();
        return res.send(result);
        } catch (err) {
           res.status(500).send(err.stack);
    }
}
//delete user
async function deleteUser(req, res) {
    let obj=
    {
        "message": "User deleted successfully.",
        "applicationErrorCode": 1114
    }
    try {
        const result = await userService.deleteUser(req.params.id);
        return res.status(200).send(obj);
        } catch (err) {
           res.status(500).send(err.stack);
    }
}

//suspend user
async function suspendUser(req,res){
    let obj=
    {
        "message": "User suspended successfully.",
        "applicationErrorCode": 1114
    }
    try {
        const result = await userService.suspendUser(req.params.id);
        return res.status(200).send(obj);
        } catch (err) {
           res.status(500).send(err.stack);
    }
}

//activate user
async function activateUser(req,res){
    let obj=
    {
        "message": "User activated successfully.",
        "applicationErrorCode": 1114
    }
    try {
        const result = await userService.activateUser(req.params.id);
        return res.status(200).send(obj);
        } catch (err) {
           res.status(500).send(err.stack);
    }
}

//Gives us activation token
async function getActivationKey(req,res){
   
    try {
        const result = await userService.getActvationKey(req.params.id);
        return res.status(200).send(result);
        } catch (err) {
           res.status(500).send(err.stack);
    }
}

//activate user by token
async function activateUserByToken(req,res){
     try {
        const result = await userService.activateUserByToken(req.query.activationKey,req.body);
        let obj=
        {
            "message": result,
            "applicationErrorCode": 0
        }
        return res.send(obj);
        } catch (err) {
           res.status(500).send(err.stack);
    }
}

//change password
async function changPassword(req,res){
    try {
        const result = await userService.changPassword(req.body);
        let obj={
            "message": result,
            "applicationErrorCode": 0
        }
        return res.status(200).send(obj);
        } catch (err) {
           res.status(500).send(err.stack);
    }
}

//forgot password
async function forgotPassword(req,res){
    try {
        const result = await userService.forgotPassword(req.body);
        let obj={
            "message": result,
            "applicationErrorCode": 0
        }
        return res.status(200).send(obj);
        } catch (err) {
           res.status(500).send(err.stack);
    }
}
//Gives us loggedin user details
async function getLoggedInUserDetails(req,res){
    try {
        const result = await userService.getLoggedInUserDetails();
        return res.send(result);
        } catch (err) {
           res.status(500).send(err.stack);
    }
}
module.exports={createUser,listUsers,deleteUser,activateUser,suspendUser,activateUserByToken,changPassword,forgotPassword,getLoggedInUserDetails,getActivationKey};