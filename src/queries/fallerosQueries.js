const pool = require("../db/pool");
const getComisionByBirthDate = require("../utils/getComisionByBirthDate");
const getBunyolsByFallero = require("../utils/getBunyolsByFallero");

const getAllFalleros = async ({ dni, search, activo, comision } = {}) => {
  let query = `
    SELECT *
    FROM falleros
  `;

  const conditions = [];
  const values = [];

  if (dni) {
    values.push(dni);
    conditions.push(`LOWER(dni) = LOWER($${values.length})`);
  }

  if (search) {
    values.push(`%${search}%`);
    conditions.push(`(
      nombre ILIKE $${values.length}
      OR apellido_1 ILIKE $${values.length} 
      OR apellido_2 ILIKE $${values.length})`);
  }

  if (activo !== undefined) {
    values.push(activo === "true");
    conditions.push(`activo = $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }
  query += ` ORDER BY apellido_1 ASC, apellido_2 ASC, nombre ASC`;

  const result = await pool.query(query, values);

  let falleros = result.rows.map((fallero) => ({
    ...fallero,
    comision: getComisionByBirthDate(fallero.fecha_nacimiento),
  }));

  if (comision) {
    falleros = falleros.filter((fallero) => fallero.comision === comision);
  }

  return falleros;
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

  const fallero = result.rows[0];

  if (!fallero) return undefined;

  return {
    ...fallero,
    comision: getComisionByBirthDate(fallero.fecha_nacimiento),
    bunyols: getBunyolsByFallero(fallero),
  };
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

const getPagosByFalleroId = async (falleroId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM pagos
    WHERE fallero_id = $1
    ORDER BY ejercicio DESC, periodo DESC
    `,
    [falleroId],
  );

  return result.rows;
};

module.exports = {
  getAllFalleros,
  getFalleroById,
  createFallero,
  updateFallero,
  toggleFalleroActive,
  getPagosByFalleroId,
};
