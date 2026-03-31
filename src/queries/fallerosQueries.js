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

const updateFallero = async (
  id,
  {
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
  },
) => {
  const result = await pool.query(
    `
    UPDATE falleros
    SET
      nombre = $1,
      apellido_1 = $2,
      apellido_2 = $3,
      dni = $4,
      fecha_nacimiento = $5,
      fecha_alta = $6,
      direccion = $7,
      telefono = $8,
      email = $9,
      cargo = $10,
      activo = $11,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $12
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
      activo,
      id,
    ],
  );

  return result.rows[0];
};

const toggleFalleroActive = async (id) => {
  const result = await pool.query(
    `
    UPDATE falleros
    SET
      activo = NOT activo,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  getAllFalleros,
  getFalleroById,
  createFallero,
  updateFallero,
  toggleFalleroActive,
};
