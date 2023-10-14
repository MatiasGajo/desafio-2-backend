import { Router } from "express";
import { cambiarRol, cambiarRolAdmin, getUsers } from "../controllers/user.js";
import { userModel } from "../models/user.model.js";

let userRouter = Router()

userRouter.put('/premium/:uid', cambiarRol)
userRouter.get('/', getUsers)
userRouter.put('/admin/:uid',cambiarRolAdmin)
userRouter.delete('/', async (req, res) => {
    const dosDiasAtras = new Date();
    dosDiasAtras.setDate(dosDiasAtras.getDate() - 2);

    try {
        const resultado = await userModel.deleteMany({ last_connection: { $lt: dosDiasAtras } });
        res.json({ message: `Se eliminaron ${resultado.deletedCount} usuarios inactivos` });
    } catch (error) {
        console.error('Error al eliminar usuarios inactivos', error);
        res.status(500).json({ error: 'Error al eliminar usuarios inactivos' });
    }
});

export default userRouter;
