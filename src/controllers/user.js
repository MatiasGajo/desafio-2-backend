import { getAllUsers, getUserById, updateUserComplete } from "../services/viewsServices.js";

export const getUsers = async (req, res) => {
    try {
        const usersFound = await getAllUsers();
        
        const usuariosLimpios = usersFound.map(user => ({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            rol: user.rol
        }));
        res.send({status:"success", payload: usuariosLimpios});
    } catch (error) {
        req.logger.error(error)
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const cambiarRol = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user = await getUserById(uid);
        const userRole = user.rol;
        if(userRole === "user"){
            user.rol = "premium"
        } else if(userRole === "premium"){
            user.rol = "user"
        } else {
            return res.json({status:"error", message: "No es posible cambiar el rol"});
        }
        await updateUserComplete(uid, user);
        res.send({status:"success", message:"Rol modificado"});
    } catch (error) {
        req.logger.error(error)
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const cambiarRolAdmin = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user = await getUserById(uid);
        const userRole = user.rol;
        if(userRole === "user"){
            user.rol = "admin"
        } else if(userRole === "admin"){
            user.rol = "user"
        } else {
            return res.json({status:"error", message: "No es posible cambiar el rol"});
        }
        await updateUserComplete(uid, user);
        res.send({status:"success", message:"Rol modificado"});
    } catch (error) {
        req.logger.error(error)
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const deleteUsersConecction = async (req, res) => {
    const dosDiasAtras = new Date();
    dosDiasAtras.setDate(dosDiasAtras.getDate() - 2);
    try {
        const resul = await userModel.deleteMany({ last_connection: { $lt: dosDiasAtras } });
        res.json({ message: `Se eliminaron ${resulT.deletedCount} usuarios inactivos` });
    } catch (error) {
        req.logger.error(error)
        res.status(500).json({ status: "error", message: error.message });
    }
};