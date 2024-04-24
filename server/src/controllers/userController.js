const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { decodeToken } = require('../lib/decodeToken');

const changeEmail = async (req, res) => {
  try {
    const userId = decodeToken(req.headers.authorization);
    const { newEmail, password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    user.email = newEmail;
    await user.save();

    res.status(200).json({ message: 'Email changed successfully' });
  } catch (error) {
    console.error('Error changing email:', error);
    res.status(500).json({ message: 'Error changing email' });
  }
};

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

module.exports = { getUserTheme, changeEmail };