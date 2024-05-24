import { Trans } from "../models/transfer.model.js";
import { handleErrors } from "../database/errors.js";
import moment from "moment";

const getAllTrans = async (req, res) => {
    try {
        const data = await Trans.getAll();

        return res.json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const postOneTrans = async (req, res) => {
    try {
        const { emisor, receptor, monto, fecha } = req.body;

        if (!emisor || !receptor || !monto) return res.status(400).json({ ok: false, msg: "Faltan datos" });

        const newTrans = {
            emisor,
            receptor,
            monto,
            fecha: moment().format("LLL"),
        };

        const data = await Trans.postOne(newTrans);

        if (!data) return res.status(500).json({ ok: false, msg: "Error de servidor" });

        return res.status(201).json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const transMethod = {
    getAllTrans,
    postOneTrans,
};
