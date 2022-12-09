const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const imageSize = require("image-size");
const {connect} = require("mongoose");
const {config} = require("dotenv");
const express = require("express");

// const {singInCheckMiddleware} = require("./middlewares/")
const {imageUpload} = require("./utils/");
const routes = require("./routes/index");

let app = express();

config();

try {
	connect(process.env.MONGO_CONNECT_URL);
} catch (e) {
	console.log(e);
	app.use((req, res) => res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't connect to database"}));
}

app.use(cookieParser());

app.use(bodyParser.json());

app.use(routes);

app.use((req, res) => 
	res.status(404).send(
		{
			code: "E_NOT_FINDED", 
			msg: "cannot " + req.method + " route. please, try to make requiest again with another method.", 
			reqMethod: req.method
		}
	)
);



app.listen(process.env.PORT || 3000);
