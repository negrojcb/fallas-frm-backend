const { getFalleroById } = require("../queries/fallerosQueries");
const { createPago } = require("../queries/pagosQueries");

const postPago = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
    const fallero = await getFalleroById(id);
    if (!fallero) {
      return res.status(404).json({ error: "Fallero not found" });
    }
    const neewPago = await createPago(id, req.body);
    res.status(201).json(neewPago);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating pago", error: error.message });
  }
};

module.exports = {
  postPago,
};
