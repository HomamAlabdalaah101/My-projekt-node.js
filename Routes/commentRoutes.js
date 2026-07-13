const router = require("express").Router();
const commentsService = require("../Services/CommentsService");
const requireAuth = require("../Middlewares/authMiddleware").requireAuth;

router.post("/comment", requireAuth, async (req, res) => {
  req.body.userId = req.user.id;
  req.body.destinationId = Number(req.body.destinationId);
  await commentsService.SaveComment(req.body);
  res.redirect("/destination/" + req.body.destinationId);
});
router.get("/delete_comment/:id", requireAuth, async (req, res) => {
  await commentsService.DeleteComment(req.params.id);
  res.redirect("/manage_comments");
});

module.exports = router;
