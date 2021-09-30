const express = require('express');
const config = require("./config");
const trackerRouter = require('./Routes/tracker.routes');
const logger = require('morgan');
const cors = require("cors");

async function startServer() {
    const app = express();

    // Enabling CORS
    app.use(cors());

    app.use(logger('dev'));

    app.use('/api/tracker', trackerRouter);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        res.status(err.status || 404).json({
            message: "No such route exists"
        })
    });

    // error handler
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).json({
            message: "Error Message"
        })
    });

    app.listen(config.port, (req, res) => {
        console.log(`Server started on port ${config.port}`)
    })
}

startServer();