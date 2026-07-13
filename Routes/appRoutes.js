const router = require("express").Router();
const DestinationService = require("../Services/DestinationService");
router.get("/", (req, res) => {
  res.render("index.html", { user: req.user });
});
router.get("/home", (req, res) => {
  res.render("index.html", { user: req.user });
});
router.get("/about", (req, res) => {
  res.render("about.html", { user: req.user });
});
router.get("/portfolio", async (req, res) => {
  res.render("portfolio.html", {
    user: req.user,
    des: await DestinationService.GetAllDestinations(),
  });
});
router.get("/contact", (req, res) => {
  res.render("contact.html", { user: req.user });
});
router.get("/team", (req, res) => {
  res.render("team.html", { user: req.user });
});
router.get("/destinations", (req, res) => {
  res.render("team.html", { user: req.user });
});
router.get("/doc", (req, res) => {
  res.render("doc.html", { user: req.user });
});
router.get("/anfrage", (req, res) => {
  res.render("anfrage.html", { user: req.user });
});
module.exports = router;
