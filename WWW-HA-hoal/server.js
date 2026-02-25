const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const port = process.env.PORT || 3000;
const appRoutes = require('./Routes/appRoutes');
const userRoutes = require('./Routes/userRoutes');
const destRoutes = require('./Routes/destinationRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const commentsRoutes = require('./Routes/commentRoutes');


const authMW = require("./Middlewares/authMiddleware").authMW;
const cors = require('cors');
const dbConfig = require("./Config/dbconfig");
const nunjucks = require('nunjucks');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));
app.use(fileUpload());
app.use(authMW);

nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
    watch: true
});
app.use(express.static(__dirname + "/public"));
app.use(appRoutes);
app.use(userRoutes);
app.use(destRoutes);
app.use(adminRoutes);
app.use(commentsRoutes);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server started on port ${port} :)`);
});
dbConfig.initDB()
module.exports = server;