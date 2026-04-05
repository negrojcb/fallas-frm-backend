const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.status(200).json({
        message: "Login successful",
        user: {
          username,
          role: "admin",
        },
      });
    }

    return res.status(401).json({
      message: "Invalid credentials",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error during login",
      error: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
};
