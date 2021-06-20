import { isAuthenticated } from "../../middlewares/auth.middleware";

import * as express from "express"
import { ImagesController } from "./images.controller"
export const ImagesRoutes = express.Router()
    .put('/get', isAuthenticated , ImagesController.getImages)