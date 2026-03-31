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

const createFallero = async ({
  nombre,
  apellido_1,
  apellido_2,
  dni,
  fecha_nacimiento,
  fecha_alta,
  direccion,
  telefono,
  email,
  cargo,
  activo,
}) => {
  const result = await pool.query(
    `
    INSERT INTO falleros (
      nombre,
      apellido_1,
      apellido_2,
      dni,
      fecha_nacimiento,
      fecha_alta,
      direccion,
      telefono,
      email,
      cargo,
      activo
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
  `,
    [
      nombre,
      apellido_1,
      apellido_2,
      dni,
      fecha_nacimiento,
      fecha_alta,
      direccion,
      telefono,
      email,
      cargo,
      activo ?? true,
    ],
  );

  return result.rows[0];
};

module.exports = {
  getAllFalleros,
  getFalleroById,
  createFallero,
};
