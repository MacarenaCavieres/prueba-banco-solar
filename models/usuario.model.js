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

const getOne = async (id) => {
    const query = {
        text: "select * from usuarios where id = $1",
        values: [id],
    };

    const { rows } = await pool.query(query);

    return rows[0];
};

const deleteOne = async (id) => {
    const query = {
        text: "delete from usuarios where id = $1 returning *",
        values: [id],
    };

    const { rows } = await pool.query(query);

    return rows[0];
};

const putOne = async (nombre, balance, id) => {
    const query = {
        text: "update usuarios set nombre = $1, balance = $2 where id = $3 returning *",
        values: [nombre, balance, id],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

export const User = {
    getAll,
    postOne,
    getOne,
    deleteOne,
    putOne,
};
