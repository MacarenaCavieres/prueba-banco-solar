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

const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ ok: false, msg: "Algo salio mal" });

        const data = await User.getOne(id);

        if (!data) return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });

        return res.json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const deleteOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ ok: false, msg: "Algo salio mal" });

        const data = await User.deleteOne(id);

        if (!data) return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });

        return res.json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const putOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, balance } = req.body;

        if (!nombre || !id || !balance) return res.status(400).json({ ok: false, msg: "Datos incompletos" });

        const data = await User.putOne(nombre, balance, id);

        if (!data) return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });

        return res.json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const userMethod = {
    getAllUsers,
    postOneUser,
    getOneUser,
    deleteOneUser,
    putOneUser,
};
