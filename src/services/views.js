import PManager from "../models/DAO/prodM.js"
import UserManager from "../models/DAO/userM.js";

const userM = new UserManager;
const manager = new PManager;

export const getPro = async () => {
    return await manager.getP()
}

export const getUser = async (email) => {
    return await userM.getByEmail(email)
}

export const createUsers = async (user) => {
    return await userM.createUser(user)
}

export const getAllUsers = async () => {
    return await userM.getAll()
}

export const getUserByEmail = async (email) => {
    return await userM.getByEmail(email)
}

export const updateUsers = async (user) => {
    return await userM.updateUser(user)
}