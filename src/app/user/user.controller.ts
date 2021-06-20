import * as express from 'express';
var jwt = require('jsonwebtoken')
import { body, validationResult } from 'express-validator';
var userModel = require("./user.model")
var imagesModel = require('../images/images.model')
const bcrypt = require('bcrypt');

export class UserController{
    public static async getReport(req: express.Request, res: express.Response){
        try {
            let images = await imagesModel.find({createdBy: req.user._id})
            return res.send({success: true, message: "Got Data", data: images})
        } catch (error) {
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