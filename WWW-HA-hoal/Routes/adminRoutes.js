const router = require('express').Router();
const destService = require('../Services/DestinationService');
const userService = require('../Services/UsersService');
const commentsService = require('../Services/CommentsService');
const requireAdminAuth = require('../Middlewares/authMiddleware').requireAdminAuth;

router.get("/admin", requireAdminAuth, (req, res) => {
    res.render('admin/admin.html', { user: req.user });
});
router.get("/manage_destinations", requireAdminAuth, async (req, res) => {
    let des = await destService.GetAllDestinations();
    res.render('admin/manageDestinations.html', { user: req.user, des });
});
router.get("/manage_users", requireAdminAuth, async (req, res) => {
    let users = await userService.GetAllUsers();
    res.render('admin/manageUsers.html', { user: req.user, users });
});
router.get("/manage_comments", requireAdminAuth, async (req, res) => {
    let comments = await commentsService.GetAllComments();
    res.render('admin/manageComments.html', { user: req.user, comments });
});

module.exports = router;