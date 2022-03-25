//here we are importing all the modules or packages we are using in the file
const express = require("express")
const app = express();
const pug = require("pug")
const mongoose = require("mongoose")
const path = require("path")
const { param } = require("express/lib/request");
const fs = require("fs");
const Register = require("./db/registration_schema");
const Contact =require("./db/contact_schema")
const Login =require("./db/loginSchema")
require("./db/connect")
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
var session;
//session management
const sessions = require('express-session');

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

//EXPRESS REALTED STUFFS definig static stuffs like html css and images 
app.use("/static", express.static("static"))




//PUG REALTED STUFFS setting template engine as pug in the views directory
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))




//ENDPOINTS 
app.get("/", (req, res) => {
    res.status(200).render("index");
})
app.get("/contact", (req, res) => {
    res.render("contact");
})
app.get("/faculty", (req, res) => {
    res.render("faculty");
})
app.get("/loginpage", (req, res) => {
    res.render("loginpage");
})
app.get("/help", (req, res) => {
    res.render("help");
})
app.get("/c", (req, res) => {
    res.render("c");
})
app.get("/physics", (req, res) => {
    res.render("studymaterial");
})
app.get("/cpp", (req, res) => {
    res.render("cpp");
})
app.get("/math", (req, res) => {
    res.render("maths");
})
app.get("/chemistry", (req, res) => {
    res.render("chemistry");
})
app.get("/python", (req, res) => {
    res.render("python");
})




//POST REQUEST FOR REGISTRATION FORM IN MAIN PAGE
app.post('/registration', async (req, res) => {
    try {
        const newUser = new Register({
            firstname: req.body.firstname,
            fathername: req.body.fathername,
            city: req.body.city,
            contactnumber: req.body.contactnumber,
            standard: req.body.standard,
            course: req.body.course,
            email: req.body.email,
        })
        const registered = await newUser.save();
        res.render("index");
    } catch (error) {
        res.status(400).send(error);
    }
})




//POST REQUEST FOR CONTACT FORM IN CONTACT PAGE
app.post("/contact", async (req, res) => {
    try {
        const newContact=new Contact({
            name:req.body.name,
            email:req.body.email,
            city:req.body.city,
            subject:req.body.subject
        })
        const contact_regitered = await newContact.save();
        res.render("index");
    } catch (error) {
        res.status(400).send(error);
    }
})



//POST REQUEST FOR login FORM IN login PAGE
app.post("/loginstudent", async (req, res) => {
    try {
           const email=req.body.email;
           const password=req.body.password;

           const usermail= await Register.findOne({email:email});
           
           if(usermail.contactnumber == password){
               res.render("studymaterial");
           }
           else{
            res.send("invalid login")
        }
    } catch (error) {
        res.status(400).send(error);
    }
})
app.post("/loginteacher", async (req, res) => {
    try {
           const username=req.body.username;
           const password=req.body.password;
           session=req.session;
           const usermail= await Login.findOne({username:username});
           if(usermail.password == password){
               res.status(201).redirect("/allStudents");
           }
           else{
               res.send("invalid login");
           }
    } catch (error) {
        res.status(400).send(error);
    }
})


// to get profile of single student
app.get('/student/:id', async (req, res) => {
    try {
       const learner = await Register.findById(req.params.id)
       res.render('learner', { x: learner})
    } catch (error) {
        console.log(error)
       res.send(error);
    }
 })
 
// to delete a record from the student list
 app.get('/x/student/:id', async (req, res) => {
    try {
        const removed = await Register.findById(req.params.id)
        await removed.deleteOne()
        res.redirect("/allStudents")
    } catch (error) {
        console.log(error)
        res.send(error);
    }
})


 //to get the list of all students 
 app.get('/allStudents', async (req, res) => {
    try {
       const students = await Register.find()
       res.render('list', {x: students})
    } catch (error) {
       res.status(404).send(error)
    }
 })
 

//START THE SERVER
app.listen(port, () => {
    console.log(`server runnig at ${port}`)
})
