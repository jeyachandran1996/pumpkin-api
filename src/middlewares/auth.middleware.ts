var jwt = require("jsonwebtoken")
var userModel = require("../app/user/user.model")
export async function isAuthenticated(req, res, next){
    try {
        let token = ""
        if(req.headers.authorization){
            token = req.headers.authorization.split('Bearer ')[1]
            var decoded = await jwt.verify(token, 'shared-secret');
            let user = await userModel.find({username: decoded['username']})
            if(user.length==0) return res.status(403).send()
            req.user = user[0]
            next()
        }
        else return res.status(401).send()
    } catch (error) {
        console.log(error)
        return res.status(401).send()
    }
}