const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require('body-parser')

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/uploadedFiles', express.static('uploadedFiles'))
app.use(require('./routes/auth.route'));

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
})
