const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');

const temperatureComponent = require('./components/temperature');

//app.use(customHeaderCheckerMiddleware);
app.use(bodyParser.json());
app.use(cors());

// Components
app.use('/temperature', temperatureComponent);


app.listen(port, () => {
    console.log(`Listening port: ${port}\n`);
});