const userCheck = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
    res.sendStatus(401);
  }
};

module.exports = userCheck;
