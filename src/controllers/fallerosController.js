const {
  getAllFalleros,
  getFalleroById,
  createFallero,
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

const postFallero = async (req, res) => {
  try {
    const newFallero = await createFallero(req.body);
    res.status(201).json(newFallero);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "A fallero with this DNI already exists",
      });
    }
    res.status(500).json({
      message: "Error creating fallero",
      error: error.message,
    });
  }
};

module.exports = {
  getFalleros,
  getFallero,
  postFallero,
};
