import User from "../models/user.js";

const renderLoginPage = (req, res, next) => {
  res.render("login");
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({});
  if (!user) {
    res.render("login", { message: "Login failed" });
    return;
  }
  const isMatch = await user.comparePassword(password);
  if (isMatch) {
    req.session.authenticated = true;
    res.redirect("../");
  } else {
    res.render("login", { message: "Login failed!" });
  }
};

const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("../");
  });
};

export { renderLoginPage, login, logout };
