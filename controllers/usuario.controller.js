import { User } from "../models/usuario.model.js";
import { handleErrors } from "../database/errors.js";

const getAllUsers = async (req, res) => {
    try {
        const data = await User.getAll();

        return res.json(data);
    } catch (error) {
        console.error(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const postOneUser = async (req, res) => {
    try {
        const { nombre, balance } = req.body;
        if (!nombre || !balance) return res.status(400).json({ ok: false, msg: "Datos incompletos" });

        const data = await User.postOne(nombre, balance);

        return res.status(201).json(data);
    } catch (error) {
        console.error(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const userMethod = {
    getAllUsers,
    postOneUser,
};
