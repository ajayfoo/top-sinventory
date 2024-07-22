import User from "../models/user.js";

const renderLoginPage = (req, res, next) => {
  res.render("login");
};

const login = async (req, res, next) => {
  console.log("login()");
  const { username, password } = req.body;
  const user = await User.findOne({});
  if (!user) {
    res.render("login", { message: "Login failed" });
    return;
  }
  const isMatch = await user.comparePassword(password);
  console.log("IsMatch? " + isMatch);
  if (isMatch) {
    req.session.authenticated = true;
    res.redirect("../");
  } else {
    res.render("login", { message: "Login failed!" });
  }
};

export { renderLoginPage, login };
