import { isAuthenticated } from "../../middlewares/auth.middleware";

import * as express from "express"
import { UserController } from "./user.controller"
export const UserRoutes = express.Router()
    .get('/report', isAuthenticated, UserController.getReport)