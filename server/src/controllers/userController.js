const User = require('../models/userModel');
const { decodeToken } = require('../lib/decodeToken');

const getUserTheme = async (req, res) => {
  try {
    const userId = decodeToken(req.headers.authorization);
    const user = await User.findById(userId, { theme: 1 });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ theme: user.theme });
  } catch (error) {
    console.error('Error fetching user theme:', error);
    res.status(500).json({ message: 'Error fetching user theme' });
  }
};

module.exports = { getUserTheme };