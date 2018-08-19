// importing express
const express = require('express')
const fs = require('fs')
const http = require('http')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const appConfig = require('./config/appConfig')
const cookieParser = require('cookie-parser')
const errorHandlerMiddleware = require('./middleware/appErrorHandler')
const routeloggerMiddleware = require('./middleware/routelogger')
const logger = require('./libs/loggerlib')

const app = express(); // declaring an instance of express

// app level middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(helmet());

//custum middleware
app.use(errorHandlerMiddleware.errorhandler)
app.use(routeloggerMiddleware.logIp)    

// bootstraped models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log(file)
        require(modelsPath + '/' + file)
    }
  })
// end

// bootstraped routes
const routePath = "./routes"     // path of routes
fs.readdirSync(routePath).forEach(
    function (file) {
        if (~file.indexOf('.js')) {       // fetching file system for js files
            console.log("included routes file of name " + file);
           let route =  require(routePath + '/' + file)     // inlcuding all the router files in require method
           route.setRouter(app)
        }
    }
)
// end

// 404 error handler
app.use(errorHandlerMiddleware.notFoundHandler)

const server = http.createServer(app)
// start listening to http server
console.log(appConfig)
server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)



function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    let db = mongoose.connect(appConfig.db.uri,{useNewUrlParser:true})
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})


// mongodb handling events

// handling mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)

}); // end

// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);

    } else {
        console.log("database connection open success");
    }

}); //end
