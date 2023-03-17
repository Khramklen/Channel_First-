const bcrypt = require('bcrypt');

const { User } = require('../db/models');

// eslint-disable-next-line consistent-return
const authUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ password: hash, email });

      req.session.user = { userId: newUser.id };

      req.session.save(() => {
        res.status(200).json({
          user: req.session.user,
          credentials: 'include',
        });
      });
    } else {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        req.session.user = { userId: user.id };

        req.session.save(() => {
          res.status(200).json({
            user: req.session.user,
          });
        });
      } else {
        return res.status(404).json({ message: 'Неверный email или пароль' });
      }
    }
  } catch (error) {
    res.json(`Error ------> ${error}`);
  }
};

module.exports = {
  authUser,
};
