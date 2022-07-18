const cors = require('cors');
const config = require('./config');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

let domain;

try {
    const domainUrl = new URL(config.domain);
    domain = {
    host: domainUrl.hostname,
    protocol: domainUrl.protocol,
    };
} catch (e) {
    console.log(e);
    throw new TypeError("Invalid domain specific in the config file.");
}

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(cors());

// We bind the domain.
app.locals.domain = config.domain.split("//")[1];
// We initialize body-parser middleware to be able to read forms.
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
    extended: true,
    }),
);

mongoose.connect(config.mongodb_srv, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connected to the Dungeoneer Database`)
}).catch((err) =>{
    console.log(err);
});

app.get('/api/test', async(req,res) => {
    res.json({test: 'This works!'});
})


app.listen(config.port, null, null, () =>
    console.log(`Dashboard is up and running on port ${config.port}.`),
);