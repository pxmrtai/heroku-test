const bcrypt = require("bcrypt");

const User = require("../../models/user.model.js");

const saltRounds = 10;

module.exports.postLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = await User.findOne({ email });

  if (!user) {
    res.json(["User does not exist."]);
    return;
  }

  if (!user.wrongLoginCount) {
    await User.findByIdAndUpdate(user.id, {
      wrongLoginCount: 0
    });
  }

  if (user.wrongLoginCount >= 4) {
    res.json({
      errors: ["Your account has been locked."],
      values: req.body
    });

    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    await User.findByIdAndUpdate(user.id, {
      wrongLoginCount: (user.wrongLoginCount += 1)
    });

    res.json({
      errors: ["Wrong password."],
      values: req.body
    });

    return;
  }

  res.json({ login: true });
};
