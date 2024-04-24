const User = require("../models/userModel");
const { decodeToken } = require("../lib/decodeToken");

const updateTheme = async (req, res) => {
  try {
    const userId = decodeToken(req.headers.authorization);
    const theme = req.body.theme;

    // Update the user's theme preference
    const user = await User.findByIdAndUpdate(
      userId,
      { theme },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Theme updated successfully", theme: user.theme });
  } catch (error) {
    console.error("Error updating theme:", error);
    res.status(500).json({ message: "Error updating theme" });
  }
};

module.exports = { updateTheme };