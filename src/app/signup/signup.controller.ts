import * as express from 'express';
var jwt = require('jsonwebtoken')
import { body, validationResult } from 'express-validator';
var userModel = require("../user/user.model")
const bcrypt = require('bcrypt');

export class SignUpController{
    public static async signUp(req: express.Request, res: express.Response){
        console.log(req.body)
        try {
            await body('username', 'Email is not valid').isEmail().run(req)
            await body('name', "Name should not be empty").notEmpty().run(req)
            await body('password', "Password should contain minimum of 8 characters").isLength({min: 8}).run(req)
            let error:any = await validationResult(req)
            if(error.errors.length>0){
                return res.send({success: false, message: error.errors[0]['msg']})
            }
            let duplicate = await userModel.count({username: req.body.username})
            if(duplicate>0) return res.send({success: false, message: "Username already exists"})
            let hashPwd = await hashPassword(req.body.password)
            let data:any = {
                name: req.body.name,
                username: req.body.username,
                password: hashPwd,
                userType: req.body.userType,
                createdOn: new Date()
            }
            let create = await userModel.create(data)
            console.log(error)
            console.log(create)
            return res.send({success: true, message: "Created Successfully", create})
        } catch (error) {
            console.log(error)
            return res.status(500).send({success: false, message: "Something went wrong", error})
        }
    }
}

function hashPassword(password){
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password, 10, function(err, hash) {
            // Store hash in your password DB.
            if(err) reject(err)
            resolve(hash)
        });
    })
}