import { pool } from "../database/connection.js";

const getAll = async () => {
    const { rows } = await pool.query("select * from transferencias");
    return rows;
};

const postOne = async ({ emisor, receptor, monto, fecha }) => {
    try {
        await pool.query("begin");

        const query1 = {
            text: "update usuarios set balance = balance - $1 where id = $2",
            values: [monto, emisor],
        };

        await pool.query(query1);

        const query2 = {
            text: "update usuarios set balance = balance + $1 where id = $2",
            values: [monto, receptor],
        };

        await pool.query(query2);

        const query3 = {
            text: "insert into transferencias (emisor, receptor, monto,fecha) values ($1,$2,$3,$4) returning *",
            values: [emisor, receptor, monto, fecha],
        };

        const { rows } = await pool.query(query3);

        await pool.query("commit");

        return rows[0];
    } catch (error) {
        console.error("Error en la transaccion==> ", error);
        await pool.query("rollback");
        throw error;
    }
};

export const Trans = {
    getAll,
    postOne,
};
