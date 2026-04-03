const pool = require("../db/pool");

const createPago = async (
  falleroId,
  { ejercicio, tipo_pago, periodo, estado, fecha_pago },
) => {
  const result = await pool.query(
    `
        INSERT INTO pagos (
            fallero_id,
            ejercicio,
            tipo_pago,
            periodo,
            estado,
            fecha_pago
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
    [falleroId, ejercicio, tipo_pago, periodo, estado, fecha_pago],
  );
  return result.rows[0];
};

const updatePago = async (
  pagoId,
  { ejercicio, tipo_pago, periodo, estado, fecha_pago },
) => {
  const result = await pool.query(
    `
    UPDATE pagos
    SET
      ejercicio = $1,
      tipo_pago = $2,
      periodo = $3,
      estado = $4,
      fecha_pago = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *
    `,
    [ejercicio, tipo_pago, periodo, estado, fecha_pago || null, pagoId],
  );

  return result.rows[0];
};

const deletePago = async (pagoId) => {
  const result = await pool.query(
    `
    DELETE FROM pagos
    WHERE id = $1
    RETURNING *
    `,
    [pagoId],
  );

  return result.rows[0];
};

module.exports = {
  createPago,
  updatePago,
  deletePago,
};
