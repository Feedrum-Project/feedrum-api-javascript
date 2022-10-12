const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const {connect} = require("mongoose");
const {config} = require("dotenv");
const express = require("express");




const routes = require("./routes/index");

let app = express();

config();

connect(process.env.MONGO_CONNECT_URL);

app.use(bodyParser.json());

app.use(routes);

app.listen(process.env.PORT || 3000);