import { ImagesRoutes } from "./src/app/images/images.route"
import {LoginRoutes} from "./src/app/login/login.route"
import {SignUpRoutes} from "./src/app/signup/signup.route"
import {UserRoutes} from "./src/app/user/user.route"
export const routes = [
    {
        path: "/login",
        handler: LoginRoutes
    },
    {
        path: "/signup",
        handler: SignUpRoutes
    },
    {
        path: "/user",
        handler: UserRoutes
    },
    {
        path: "/images",
        handler: ImagesRoutes
    }
]