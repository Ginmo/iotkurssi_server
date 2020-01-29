const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');

const temperatureComponent = require('./components/temperature');

const customHeaderCheckerMiddleware = function(req, res, next) {
    console.log('Middleware is active!');
    if(req.headers['custom-header-param'] === undefined)
    {
        return res.status(400).json({ reason: "custom-header-param header missing"});
    }

    // pass the control to the next handler in line
    next();
}

//app.use(customHeaderCheckerMiddleware);
app.use(bodyParser.json());
app.use(cors());


/* basic HTTP method handling */
app.get('/hello', (req, res) => res.send('Hello GET World!'));
app.post('/hello', (req, res) => res.send('Hello POST World!'));
app.put('/hello', (req, res) => res.send('Hello PUT World!'));
app.delete('/hello', (req, res) => res.send('Hello DELETE World!'));

/* Example of defining routes with different method handlers */
app.route('/world')
    .get((req,res) => res.send('get World'))
    .post((req, res) => res.send('post World'))
    .put((req, res) => res.send('put World'))
    .delete((req, res) => res.send('delete World'))

// Components
app.use('/temperature', temperatureComponent);


app.listen(port, () => {
    console.log(`Listening port: ${port}\n`);
});