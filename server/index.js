/**
 * SERVER MAIN
 * Create a nodejs web server with express framework
 * Serve static content
 * API gateway, route API requests to API main router (server/routes/index.js)
 */

// Include libraries
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// HTTPS redirect
const redirector = require("redirect-https")({
    body: "<!-- Hello Developer! Please use HTTPS instead: {{ URL }} -->"
});

// CORS support
const cors = require('cors');
const dotenv = require("dotenv");

// Configure .env file support
dotenv.config()

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });

} else {
    // Create an express server
    const app = express();
    const routes = require('./routes');

    app.use("/", redirector);

    // Allow CORS options
    const corsOptions = {
        origin: '*',
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'x-xsrf-token'],
        exposedHeaders: ["Set-Cookie"],
        credentials: true,
        optionsSuccessStatus: 200
    };
    app.use(cors(corsOptions));

    // Priority serve any static files.
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    // Handle API calls, route all '/api' requests
    app.use('/api', routes);

    // All remaining requests return the React app, so it can handle routing.
    app.get('*', function(request, response) {
        response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });

    app.listen(PORT, function () {
        console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
    });
}
