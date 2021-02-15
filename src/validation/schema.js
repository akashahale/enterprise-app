const joi = require("joi");
const schema = {
    userData: joi.object({
        name: joi.string().max(100).required(),
        username: joi.string().max(100).required(),
        emailId: joi.string().email().required().lowercase(),
        roles:joi.array().items(joi.string()).required()
    }),
    
    roleData:joi.object({
        name: joi.string().max(100).required(),
        description: joi.string().required(),
        permission_id:joi.array().items(joi.number()).required()
    }),

   enterpriseData:joi.object({
    name: joi.string().max(100).required(),
    admin: joi.object().pattern(/.*/,[joi.string().email().required().lowercase(), joi.string(),joi.string()])
   }),

   activateUser:joi.object({
    newPassword:joi.string().min(8).required().strict(),
    confirmPassword: joi.any().valid(joi.ref('newPassword')).required()
   }),
  
  getSalt:joi.object({
    username: joi.string().max(100).required(),
  }),

  authenticateUser:joi.object({
    username: joi.string().max(100).required(),
    password:joi.string().min(8).required().strict(),
  }),

  createPasswordPolicy:joi.object({
    policy_name:joi.string().max(100).required(),
    description:joi.string(),
    minPasswordLength:joi.number().min(7),
    minLowerAlphaChars:joi.number().min(1),
    minUpperAlphaChars:joi.number().min(1),
    minNumericalChars:joi.number().min(1),
    minSpecialChars:joi.number().min(1 ),
    passwordHistoryLength:joi.number().min(7),
    specialChars:joi.number().min(1),
    passwordAge : joi.number().min(10),
    status:joi.string().max(10).required()
  }),
  
  changPassword:joi.object({
    password:joi.string().min(8).required().strict(),
    newPassword:joi.string().min(8).required().strict(),
    confirmPassword: joi.any().valid(joi.ref('newPassword')).required()
  }),

  forgotPassword:joi.object({
   username: joi.string().max(100).required()
  })

};

module.exports = schema;