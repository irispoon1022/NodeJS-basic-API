let express = require('express');
let app = express();
const bodyParser = require('body-parser');

//this is to parse the payload from POST request
app.use(bodyParser.urlencoded({ extended: false }));

//log the request method, path and ip
app.use(function (req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

// for route "/", serve a file in "/views/index.html"
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//apply the css files in the /public folder
app.use("/public", express.static(__dirname + "/public"));

//for route "/json", send a JSON object
app.get("/json", (req, res) => {
    const json = { message: "Hello json" };
    //convert the message to upper case or not depends on the environment variable "process.env.MESSAGE_STYLE"
    json.message = process.env.MESSAGE_STYLE === "uppercase" ? json.message.toUpperCase() : json.message;
    //converts a javascript object to a a string, then sets the appropriate headers to tell your browser that you are serving JSON, and sends the data back
    res.json(json);
});


app.get("/now", (req, res, next) => {
        //add middleware function to add request time to the request object
        req.time = new Date().toString();
        next();
    },
    (req, res) => res.json({ time: req.time })
);

//url params "word" is stored in "req.params.word"
app.get("/:word/echo", (req, res) => res.json({ echo: req.params.word }));

app.route("/name")
    .get((req, res) => {
        res.json({ name: `${req.query.first} ${req.query.last}` });
    })
    .post((req, res) => {
        res.json({ name: `${req.body.first} ${req.body.last}` });
    })
































module.exports = app;
