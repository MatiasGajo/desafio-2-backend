import { Router } from "express";
import { cambiarRol, cambiarRolAdmin, getUsers, deleteUsersConecction} from "../controllers/user.js";
import { userModel } from "../models/user.model.js";

let userRouter = Router()

userRouter.put('/premium/:uid', cambiarRol)
userRouter.get('/', getUsers)
userRouter.put('/admin/:uid',cambiarRolAdmin)
userRouter.delete('/', deleteUsersConecction)

export default userRouter;
