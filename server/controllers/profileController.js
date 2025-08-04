const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    // Get user ID from authentication middleware
    const userId = req.userId;

    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  const { name, website, github, linkedin } = req.body;

  try {
    // Assuming user ID is available in req.userId (from authentication middleware)
    const userId = req.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, website, github, linkedin },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProfile, updateProfile };
