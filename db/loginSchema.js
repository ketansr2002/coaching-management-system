const mongoose=require("mongoose")

const loginSchema= new mongoose.Schema({
     username:{
         type:String,
         required:true
     },
     password:{
         password:{
             type:String,
             required:true
         }
     }
})

const Login=new mongoose.model("Login",loginSchema)
module.exports=Login