import * as express from "express"
import { LoginController } from "./login.controller"

export const LoginRoutes = express.Router()
    .post('/', LoginController.login)