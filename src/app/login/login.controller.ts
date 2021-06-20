import * as express from 'express';
// const CustomerModel = require('../../model/customer.model')
var jwt = require('jsonwebtoken')
var userModel = require("../user/user.model")
const bcrypt = require("bcrypt")
import { body, validationResult } from 'express-validator';

export class LoginController{
    public static async login(req: express.Request, res: express.Response){
        console.log(req.body)
        try {
            await body('username', 'Email is not valid').isEmail().run(req)
            await body('password', "Password is empty").notEmpty
            let error:any = await validationResult(req)
            if(error.errors.length>0){
                return res.send({success: false, message: error.errors[0]['msg']})
            }
            let userData = await userModel.find({username: req.body.username})
            if(userData.length==0){
                return res.send({success: false, message: "Invalid Credentials"})
            }
            let pwdCheck = await checkPassword(req.body.password, userData[0]['password'])
            console.log(userData)
            if(!pwdCheck) return res.send({success: false, message: "Password does not match"})
            let data = {
                username: userData[0]['username'],
                _id: userData[0]['_id'],
                userType: userData[0]['userType']
            }
            let token = jwt.sign(data, 'shared-secret')
            return res.send({success: true, message: "Login success", token, routeTo: userData[0]['userType']})
        } catch (error) {
            console.log(error)
            return res.status(500).send({success: false, message: "Something went wrong", error})
        }
    }
}

async function checkPassword(pwd, hashPwd){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(pwd, hashPwd, function(err, result) {
            // result == true
            if(err) reject(err)
            resolve(result)
        });
    })
}

async function generateToken(data){
    
}