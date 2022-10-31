const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const {connect} = require("mongoose");
const {config} = require("dotenv");
const express = require("express");

const {singInCheckMiddleware} = require("./middlewares/")
const routes = require("./routes/index");

let app = express();

config();
try {
	connect(process.env.MONGO_CONNECT_URL);
} catch (e) {
	console.log(e);
	app.use((req, res) => res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't connect to database"}))
}

app.use(cookieParser());

app.use(bodyParser.json());

app.use(routes);

try {
	app.listen(process.env.PORT || 3000);
} catch (e) {
	console.log(e);
	app.use((req, res) => res.status(500).send({code: "E_SERVER_INTERNAL", msg: "smth went wrong"}));
}
