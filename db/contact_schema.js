const mongoose=require("mongoose")

const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    subject:{
        type:String
    }

})

// now we need to create a collection
const Contact=new mongoose.model("Contact",contactSchema)
module.exports=Contact;