import { pool } from "../database/connection.js";

const getAll = async () => {
    const { rows } = await pool.query("select * from usuarios");
    return rows;
};

const postOne = async (nombre, balance) => {
    const query = {
        text: "insert into usuarios (nombre,balance) values ($1,$2) returning *",
        values: [nombre, balance],
    };

    const { rows } = await pool.query(query);

    return rows[0];
};

export const User = {
    getAll,
    postOne,
};
