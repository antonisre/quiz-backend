'use strict';
require('dotenv').config();

const 
    cors = require('cors'),
    http = require('http'),
    morgan = require('morgan'),
    express = require('express'),
    bodyParser = require('body-parser');
    const responseHandler = require('./src/util/responseHandler');
    const databaseInit = require('./src/models/index');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const routes = require('./src/routes/index');
databaseInit();

app.use(cors({ credentials: true, origin: true }));
app.use(morgan(process.env.LOG || 'combined'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('uploads'));

app.use('/', routes);
app.use((req, res, next) => {
    
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
app.use((err, req, res, next) => {
    console.log(err)
    if (err.type === 'entity.parse.failed') {
        return responseHandler.errorResponse(res, { statusCode: err.status, message: 'Invalid JSON' });
    }

    if (res.headersSent) {
        return next(err);
    }

    if (err.status === 404) {
        return responseHandler.errorResponse(res, { statusCode: err.status, message: 'Route not found' });
    }

    responseHandler.errorResponse(res, { statusCode: 500, message: 'Something went wrong' });
})

server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});