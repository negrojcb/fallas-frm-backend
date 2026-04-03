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

module.exports = {
  createPago,
};
