const mongoose=require("mongoose")
const { required } = require("nodemon/lib/config")

const registrationSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    fathername:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    contactnumber:{
        type:Number,
        required:true
    },
    standard:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true              //email should be unique
    }
})

// now we need to create a collection
const Register=new mongoose.model("Register",registrationSchema)
module.exports=Register;