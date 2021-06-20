import * as express from "express"
import { SignUpController } from "./signup.controller"
export const SignUpRoutes = express.Router()
    .post('/', SignUpController.signUp)