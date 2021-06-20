import * as express from 'express';
var jwt = require('jsonwebtoken')
import { body, validationResult } from 'express-validator';
var imagesModel = require("./images.model")
const bcrypt = require('bcrypt');

export class ImagesController{
    public static async getImages(req: express.Request, res: express.Response){
        try {
            let query:any = {}
            try {
                if(req.body.hasOwnProperty('data'))
                    if(req.body.data.length>0){
                        query['category'] = {$in: req.body.data}
                    }
            } catch (error) {
                
            }
            let images = await imagesModel.find(query)
            return res.send({success: true, message: "Created Successfully", data: images})
        } catch (error) {
            console.log(error)
            return res.status(500).send({success: false, message: "Something went wrong", error})
        }
    }
}