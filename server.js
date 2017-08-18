const express = require("express");
const hbs = require("hbs");

const port = process.env.port || 3000;
let app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine', 'hbs');

// log
app.use((req, res, next) => {
    let now = new Date().toString();
    console.log(`${now}: ${req.method} ${req.url}`);
    next();
});

// // maintain in progress
// app.use((req, res, next) => {
//     res.render("maintain.hbs", {
//         message: "Maintenance in process, please come back later..."
//     });
//     // no next here
// });

// helper
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});
hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

// main route
app.get("/", (req, res) => {
    // res.send("<h1>Hello, Express!</h1>");
    res.render("index.hbs", {
        pageTitle: "Home",
        message: "Welcome to the test site!"     
    });
});

app.get("/about", (req, res) => {
    // res.send("<h2>About</h2>");
    res.render("about.hbs", {
        pageTitle: "About"
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Bad request!"
    });
});

app.use(express.static(__dirname+"/public"));

// listen
app.listen(port, () => {
    console.log(`Server set up on Port: ${port}`);
});