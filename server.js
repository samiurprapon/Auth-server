// import modules
const express = require('express');
const Sequelize = require('./models/index').Sequelize;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

//config
const config = require('./config/secrets.json');

// routes
const authRoutes = require('./routes/authRoutes');

const server = express();
const port = process.env.PORT || config.PORT;

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(cors());
server.use(morgan('dev'));
// routing
server.use('/api/auth', authRoutes.router);

Sequelize.sync({
    force: true
})
.then( () => {
    server.listen(port, () => {
        console.log('Server started on :'+port);
    });
})
.catch(error => {
    console.log(error);
});