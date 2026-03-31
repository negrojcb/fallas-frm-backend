const {
  getAllFalleros,
  getFalleroById,
} = require("../queries/fallerosQueries");

const getFalleros = async (req, res) => {
  try {
    const falleros = await getAllFalleros();
    res.json(falleros);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching falleros",
      error: error.message,
    });
  }
};

const getFallero = async (req, res) => {
  try {
    const { id } = req.params;
    const fallero = await getFalleroById(id);
    if (!fallero) {
      return res.status(404).json({ message: "Fallero not found" });
    }
    res.json(fallero);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching fallero",
      error: error.message,
    });
  }
};

module.exports = {
  getFalleros,
  getFallero,
};
