const {userData,roleData,enterpriseData,activateUser,getSalt,authenticateUser,createPasswordPolicy,changPassword,forgotPassword}=require("../validation/schema");

const createUserValidation=async (req,res,next)=>{
const result=await userData.validate(req.body);
if (result.error) {
    res.json({
        message: result.error.details[0].message
    })
} else {
    next();
}
}

const RoleValidation=async (req,res,next)=>{
    const result=await roleData.validate(req.body);
    if (result.error) {
        res.json({
            message: result.error.details[0].message
        })
    } else {
        next();
    }
}

const enterpriseValidation=async (req,res,next)=>{
    const result=await enterpriseData.validate(req.body);
    if (result.error) {
        res.json({
            message: result.error.details[0].message
        })
    } else {
        next();
    }
}

const activateUserValidation=async (req,res,next)=>{
    const result=await activateUser.validate(req.body);
    if (result.error) {
        res.json({
            message: result.error.details[0].message
        })
    } else {
        next();
    }
}

const saltValidation=async (req,res,next)=>{
    const result=await getSalt.validate(req.body);
    if (result.error) {
        res.json({
            message: result.error.details[0].message
        })
    } else {
        next();
    }
}


const userAuthValidation=async (req,res,next)=>{
    const result=await authenticateUser.validate(req.body);
    if (result.error) {
        res.json({
            message: result.error.details[0].message
        })
    } else {
        next();
    }
}

const passwordPolicyValidation=async (req,res,next)=>{
    const result=await createPasswordPolicy.validate(req.body);
    if (result.error) {
        res.json({
            message: result.error.details[0].message
        })
    } else {
        next();
    }
}

const changePasswordValidation=async (req,res,next)=>{
    const result=await changPassword.validate(req.body);
    if (result.error) {
        res.json({
            message: result.error.details[0].message
        })
    } else {
        next();
    }
}

const forgotPasswordValidation=async (req,res,next)=>{
    const result=await forgotPassword.validate(req.body);
    if (result.error) {
        res.json({
            message: result.error.details[0].message
        })
    } else {
        next();
    }
}

module.exports={createUserValidation,RoleValidation,enterpriseValidation,activateUserValidation,saltValidation,userAuthValidation,passwordPolicyValidation,changePasswordValidation,forgotPasswordValidation};