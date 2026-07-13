const router = require("express").Router();
const userService = require("../Services/UsersService");
const encService = require("../Services/EncryptionService");
const jwtService = require("../Services/jwtService");
const requireAuth = require("../Middlewares/authMiddleware").requireAuth;
router.get("/login", async (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("login.html", { user: req.user });
});
router.post("/login", async (req, res) => {
  let result = await userService.AuthUser(req.body.username);
  if (result) {
    let passConfirmation = await encService.matchPassword(
      req.body.password,
      result.password
    );
    if (!passConfirmation) {
      return res.redirect("/login");
    }
  } else {
    return res.redirect("/login");
  }
  let token = jwtService.createToken(result);
  res.cookie("token", token, { maxAge: 86400 });
  res.redirect("/");
});
router.get("/signup", async (req, res) => {
  try {
    res.render("signup.html");
  } catch (err) {
    console.log(err);
    res.redirect("/signup");
  }
});
router.post("/signup", async (req, res) => {
  try {
    await userService.SaveUser(req.body);
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.redirect("/signup");
  }
});
router.get("/logout", function (req, res) {
  res.cookie("token", "", { expires: new Date(0) });
  res.redirect("/");
});
router.get("/update_profile", requireAuth, async (req, res) => {
  try {
    let user = await userService.GetUserById(req.user.id);
    res.render("update_profile.html", { user });
  } catch (err) {
    console.log(err);
    res.status(500).send({});
  }
});
router.post("/update_profile", requireAuth, async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await encService.encryptPassword(req.body.password);
    }
    req.body.id = req.user.id;
    await userService.UpdateUser(req.body);
    res.redirect("/logout");
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false });
  }
});
router.get("/delete_profile", requireAuth, async (req, res) => {
  try {
    await userService.DeleteUser(req.user.id);
    res.redirect("/logout");
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false });
  }
});
router.get("/delete_profile/:id", requireAuth, async (req, res) => {
  try {
    await userService.DeleteUser(req.params.id);
    res.redirect("/manage_users");
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false });
  }
});
router.get("/user", requireAuth, async (req, res) => {
  try {
    let users = await userService.GetAllUsers();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send([]);
  }
});
router.get("/profile", requireAuth, async (req, res) => {
  try {
    let user = await userService.GetUserById(req.user.id);
    res.render("profile.html", { user });
  } catch (err) {
    console.log(err);
    res.status(500).send({});
  }
});

module.exports = router;
