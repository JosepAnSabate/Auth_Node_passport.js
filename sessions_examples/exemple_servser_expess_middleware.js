const express = require("express");
const app = express();

app.use(middleware2);
app.use(middleware1);


function middleware1 (req, res, next) {
    console.log("I am middleware #1");
    req.customProperty = 100;
    //const errObj = new Error("I am an error");
    
    next(//errObj
        );
}

function middleware2 (req, res, next) {
    console.log("I am middleware #2");
    console.log(`The custom property value is: ${req.customProperty}`)
    req.customProperty = 600;
    next();
}

function middleware3 (req, res, next) {
    console.log("I am middleware #3");
    next();
}

function errorHandler (err, req, res, next) {
    // if (err) {
    //     res.send('<h1>There was an error, please try again.</h1>');
    // }
    res.json({ err: err })
}

// function errorHandler2 (err, req, res, next) {
//     if (err.status === 2)
// }

app.get('/', middleware3, (req, res, next) => {
    console.log("I am the standard Express function");
    res.send(`<h1>The value is: ${req.customProperty} </h1>`);
})

app.use(errorHandler); // l'odre dels middlewARES IMPORTA,  posar error handlers al final de rutes i altres miidewares

app.listen(3100);