const pool = require("../db/pool");

const getAllFalleros = async () => {
  const result = await pool.query(`
    SELECT *
    FROM falleros
    ORDER BY apellido_1 ASC, apellido_2 ASC, nombre ASC
  `);

  return result.rows;
};

const getFalleroById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM falleros
    WHERE id = $1
  `,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  getAllFalleros,
  getFalleroById,
};
