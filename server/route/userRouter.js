import {Router} from "express"

import { login, signup } from "../controller/userController.js"


const userRouter = Router()

userRouter.post("/create",signup)
userRouter.post("/login",login)

export {userRouter}