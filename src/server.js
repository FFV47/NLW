// EXPRESS SERVER
const express = require("express");
const server = express();

// WITHOUT NUNJUCKS
// const pageLanding = (req, res) => res.sendFile(__dirname + "/view/index.html");
// const pageStudy = (req, res) => res.sendFile(__dirname + "/view/study.html");
// const pageGiveClasses = (req, res) => res.sendFile(__dirname + "/view/give-classes.html");

// NUNJUCKS CONFIG (TEMPLATE ENGINE)
const nunjucks = require("nunjucks");
nunjucks.configure("src/view", {
	express: server,
	noCache: true,
});

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require("./pages");
server
	.use(express.static("public")) // add public folder to server root
	.use(express.urlencoded({ extended: true }))
	.get("/", pageLanding)
	.get("/study", pageStudy)
	.get("/give-classes", pageGiveClasses)
	.post("/save-classes", saveClasses)
	.listen(5500);
