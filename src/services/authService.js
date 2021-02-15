const jwt = require('jsonwebtoken');
const accessTokenSecret = 'Akash123';
const refreshTokenSecret = 'Akash@123';
var refreshTokens = [];
const db=require('../models');
var crypto = require('crypto');
const Users=db.Users;
const obj={};

//Gives us salt
async function getSalt(data){
    const result =await Users.findOne({
        where:{
             username:data.username
        }
    });
   return result.salt;
}

// Hashing algorithm sha512 
async function sha512(salt,password){
    var hash = crypto.createHmac('sha512', salt); 
    hash.update(password);
    var value = hash.digest('hex');
    return  value;
};

//login function
async function login(data){
const salt=await getSalt(data);
const password=data.password;
const passwordHash=await sha512(salt,password);
const result=await Users.findOne({
    where:{
         username:data.username,
         password:passwordHash
    }
});
if(result){
    const fres=JSON.parse(JSON.stringify(result));
    const accessToken = jwt.sign({ username: data.username },accessTokenSecret,{ expiresIn: '10m' });
    const refreshToken = jwt.sign({ username: data.username },refreshTokenSecret);
    obj['token']=accessToken;
    obj['refreshToken']=refreshToken;
    obj['enterpriseCode']=fres.enterprice_code;
    refreshTokens.push(refreshToken);
    const logedinDate=await Users.update({
        last_login_date:new Date(),
    },{
        where:{
            username:data.username
        }
    })
    return obj;
}else{
    return 'Username or password incorrect';
  }
}

//Gives us JWT token
async function getToken(data){
const token=data.token;
if (!token) {
    return "Unauthorized";
}

if (!refreshTokens.includes(token)) {
    return "forbidden";
}

jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
        return "forbidden";
    }else{
        const accessToken = jwt.sign({ username: user.username}, accessTokenSecret, { expiresIn: '10m' });
        return accessToken;
    }
});
}

//logout function
async function logout(data){
    refreshTokens = refreshTokens.filter(token => token !== data.token);
    return "Logout successful";
}
module.exports={login,getToken,logout,getSalt};
