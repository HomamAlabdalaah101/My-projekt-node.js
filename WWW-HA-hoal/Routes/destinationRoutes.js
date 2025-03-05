const router = require('express').Router();
const DestinationService = require('../Services/DestinationService');
const commentsService = require('../Services/CommentsService');
const requireAuth = require('../Middlewares/authMiddleware').requireAuth;

router.get("/add_destination", requireAuth, (req, res) => {
    res.render('addDestination.html', { user: req.user });
});
router.post('/add_destination', async (req, res) => {
    try {
        let pic = req.files.image;
        let timestamp = new Date().getTime().toString();
        const timestampedName = `${timestamp}${pic.name}`;
        //Use the mv() method to place the file 
        pic.mv(`./public/destinations/${timestampedName}`);
        await DestinationService.SaveDestination(req.body, timestampedName);
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.send({ status: false });
    }
});

router.get('/delete_destination/:id', requireAuth, async (req, res) => {
    try {
        await DestinationService.DeleteDestination(req.params.id);
        res.redirect("/manage_destinations");
    }
    catch (err) {
        console.log(err);
        res.send({ status: false });
    }
});
router.get('/update_destination/:id', requireAuth, async (req, res) => {
    let des = await DestinationService.GetSingleDestination(req.params.id);
    res.render('update_destination.html', { user: req.user, des });
});
router.post('/update_destination', async (req, res) => {
    try {
        if (req.files && req.files.image) {
            let pic = req.files.image;
            let timestamp = new Date().getTime().toString();
            const timestampedName = `${timestamp}${pic.name}`;
            pic.mv(`./static/flowers/${timestampedName}`);
            await DestinationService.UpdateDestination(req.body, timestampedName);

        }
        else {
            await DestinationService.UpdateDestination(req.body, "");
        }
        res.redirect('/manage_destinations');
    }
    catch (err) {
        console.log(err);
        res.send({ status: false });
    }
});
router.get('/destination/:id', async (req, res) => {
    let des = await DestinationService.GetSingleDestination(req.params.id);
    let comms = await commentsService.GetAllCommentsOfADestination(req.params.id);
    res.render('destination.html', { user: req.user, des, comms });
});
router.get('/search', async (req, res) => {
    let destinations = await DestinationService.GetAllDestinations();
    let des = destinations.filter(x => x.name.includes(req.query.search) || x.country.includes(req.query.search) || x.description.includes(req.query.search));
    res.render('search.html', { user: req.user, des, search: req.query.search });
});
module.exports = router;