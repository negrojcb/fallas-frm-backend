const { getFalleroById } = require("../queries/fallerosQueries");
const {
  createPago,
  updatePago,
  deletePago,
} = require("../queries/pagosQueries");

const postPago = async (req, res) => {
  try {
    const { id } = req.params;
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

const putPago = async (req, res) => {
  try {
    const { pagoId } = req.params;
    const updatedPago = await updatePago(pagoId, req.body);

    if (!updatedPago) {
      return res.status(404).json({
        message: "Pago not found",
      });
    }

    res.json(updatedPago);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating pago",
      error: error.message,
    });
  }
};

const removePago = async (req, res) => {
  try {
    const { pagoId } = req.params;
    const deletedPago = await deletePago(pagoId);

    if (!deletedPago) {
      return res.status(404).json({
        message: "Pago not found",
      });
    }

    res.json({
      message: "Pago deleted successfully",
      pago: deletedPago,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting pago",
      error: error.message,
    });
  }
};

module.exports = {
  postPago,
  putPago,
  removePago,
};
