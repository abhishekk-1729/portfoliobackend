require("dotenv").config();
const express = require("express");
// Basically it shows that I want to use express in my project

const app = express()
const cors = require("cors")
const authRoute = require("./router/auth-router")
const contactForm = require("./router/contact-router");
const getService = require("./router/services-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
// the first argument below is the route where the user wants to visit
// second argument is callback function which shows what you want to return as an output
// the arrow function handling the request and constructing the response

const corsOptions = {
    origin:"http://localhost:3000",
    method:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true
}
app.use(cors());
app.use(express.json()) // this allows sharing of json file
// This line of code adds Express middleware that parses incoming request bodies with JSON payloads. It's important to place this before any routes that need to handle JSON data in the request body. This middleware is responsible for parsing JSON data from requests and it should be applied at the beginning of your middleware stack to ensure it is available for all subsequent route handlers

app.use("/api/auth",authRoute);
app.use("/api/form",contactForm);
app.use("/api/services",getService);
app.use("/api/admin",adminRoute);
app.use(errorMiddleware);
// Mount krna khte h ise

const PORT = 8000;

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port: ${PORT}`);
    });
});