import express from "express";
import routes from "./routes/default.route.js";

// APP
const app = express();

// INCLUDES
app.use(express.json());
app.use(express.static('public'))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

// LOAD ROUTER
routes(app);

// APP
const port = 5500;
app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});