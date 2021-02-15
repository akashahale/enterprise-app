const request = require('supertest');
const app = require('../src/index');
let  activation_key;
let token;
describe(' All Endpoints', () => {

    it("should create root enterprise",async(done) => {
        request(app)
          .post('/idm/api/enterprises/root')
          .send({
                name: "happiestminds", 
                admin: {
                          emailId:"hm.bng@happiestminds.com",
                          name: "happiestminds",
                          username: "happiestminds-admin"
                       }
          })
          .end((err, response) => {
            console.log("res ",response.body)
            done();
          });
      })
      
      it('should fetch activation key',async()=>{
        const result=await request(app).get('/idm/api/users/activationkey/1');
        activation_key=result.body.activation_key;      
        expect(result.statusCode).toEqual(200);
      })

      it("should activate enterprise",async(done) => {
        request(app)
          .post(`/idm/api/users/activation?activationKey=${activation_key}`)
          .send({
            newPassword:"Password@123",
            confirmPassword :"Password@123" 
          })
          .end((err, response) => {
            expect(response.statusCode).toEqual(200);
            done();
          });
      })
    
      it("login root enterprise",async(done) => {
        request(app)
          .post('/idm/api/login')
          .send({
             username: "happiestminds-admin",
            password:"Password@123"
                       
          })
          .end((err, response) => {
              token=response.body.token;
            done();
          });
      })
 
  it('should create a new role', async () => {
    const res = await request(app).post('/idm/api/roles')
    .set('Authorization', `Bearer ${token}`)
    .send({
        name: "User",
        description:"role to manage users",
        permission_id: [1,2,3,4],
      });
    expect(res.statusCode).toEqual(201)
  })

  it('should fetch all roles',async()=>{
    const result=await request(app).get('/idm/api/roles')
    .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200);
  })

  it('should fetch specific roles',async()=>{
    const result=await request(app).get('/idm/api/roles/1')
    .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200);
  })

  it('should create a new user', async () => {
    const res = await request(app).post('/idm/api/users')
    .set('Authorization', `Bearer ${token}`)
    .send({
        name: "HMT",
        username: "HMT-ORG",
        emailId: "abc.xyz@happiestminds.com",
          roles: ['User']
      });
    expect(res.statusCode).toEqual(201)
  })

  it('should activate user', async () => {
    const res = await request(app).put('/idm/api/users/activate/2')
    .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(200)
  })

  it('should suspend user', async () => {
    const res = await request(app).put('/idm/api/users/suspend/2')
    .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(200)
  })

  it('should fetch all users',async()=>{
    const result=await request(app).get('/idm/api/users/list')
    .set('Authorization', `Bearer ${token}`)
    console.log("result ::",result.body);
    expect(result.statusCode).toEqual(200);
  })

  it('should delete specific users',async()=>{
    const result=await request(app).delete('/idm/api/users/2')
    .set('Authorization', `Bearer ${token}`)
    console.log("result ::",result.body);
    expect(result.statusCode).toEqual(200);
  })

  it('should update role', async () => {
    const res = await request(app).put('/idm/api/roles')
    .set('Authorization', `Bearer ${token}`)
    .send({
        role_id:2,
        name: "user",
        description:"role to manage users",
        permission_id: [1,2,3,4],
      });
    expect(res.statusCode).toEqual(200)
  })

  it('should delete specific role',async()=>{
    const result=await request(app).delete('/idm/api/roles/1')
    .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200);
  })

  it('should fetch salt',async()=>{
    const result=await request(app).post('/idm/api/auth/salt')
    .send({
       username:"happiestminds-admin"
      });
      console.log("salt is ",result.body);
    expect(result.statusCode).toEqual(200)
  })

  it('should fetch all enterprise',async()=>{
    const result=await request(app).get('/idm/api/enterprises');
    console.log("result ::",result.body);
    expect(result.statusCode).toEqual(200);
  })

  it('delete enterprise by id',async()=>{
    const result=await request(app).delete('/idm/api/enterprises/1');
    expect(result.statusCode).toEqual(200);
  })
  
  it('should activate enterprise', async () => {
    const res = await request(app).put('/idm/api/enterprises/1/activate')
    expect(res.statusCode).toEqual(200)
  })

  it('should suspend enterprise', async () => {
    const res = await request(app).put('/idm/api/enterprises/1/suspend')
    expect(res.statusCode).toEqual(200)
  })


  it('should create a new password policy ', async () => {
    const res = await request(app).post('/idm/api/passwordpolicies')
    .set('Authorization', `Bearer ${token}`)
    .send({
        policyName: "Default Policy2",
          description: "Admin User",
          minPasswordLength: 8,
          minLowerAlphaChars: 3,
          minUpperAlphaChars: 2,
          minNumericalChars: 1,
          minSpecialChars: 1,
          passwordHistoryLength: 1,
          specialChars: 1,
           passwordAge: 20
      });
    expect(res.statusCode).toEqual(200)
  })
  
  
  it('should fetch all password policy ', async () => {
    const res = await request(app).get('/idm/api/passwordpolicies')
    .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(200)
  })

  
  it('should update password policy ', async () => {
    const res = await request(app).put('/idm/api/passwordpolicies/1')
    .set('Authorization', `Bearer ${token}`)
    .send({
        policyName: "Policy2",
          description: "User",
          minPasswordLength: 8,
          minLowerAlphaChars: 3,
          minUpperAlphaChars: 2,
          minNumericalChars: 1,
          minSpecialChars: 1,
          passwordHistoryLength: 1,
          specialChars: 1,
           passwordAge: 20
      });
    expect(res.statusCode).toEqual(200)
  })

  it('should activate password policy', async () => {
    const res = await request(app).put('/idm/api/passwordpolicies/1/activate')
    .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(200)
  })


  it('should deactivate password policy', async () => {
    const res = await request(app).put('/idm/api/passwordpolicies/1/deactivate')
    .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(200)
  })

  it('delete  password policy by id',async()=>{
    const result=await request(app).delete('/idm/api/passwordpolicies/1')
    .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200);
  })

  it('forgot password',async()=>{
    const result=await request(app).post('/idm/api/users/forgotpassword')
    .send({
       username:"happiestminds-admin"
      });
    expect(result.statusCode).toEqual(200)
  })

  it('change password',async()=>{
    const result=await request(app).post('/idm/api/users/passswd/change')
    .set('Authorization', `Bearer ${token}`)
    .send({  
      password : "Password@123",
      newPassword : "Password@2",
      confirmPassword : "Password@2"
    });
    expect(result.statusCode).toEqual(200)
  })
  
})//end of describe