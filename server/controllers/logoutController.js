const logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('1_Test');
    res.status(200).json({ message: 'Сессия завершена', credentials: 'include' });
  });
};

module.exports = logoutUser;
