const mongoose = require("mongoose")
require('dotenv').config()

const connection = async ()=>{
    //connection to mongodb
  try{
     
  // change your mongodb atlas url 
    mongoose.connect(process.env.MONGODB_ATLAS_URL,{useNewUrlParser:true});
    console.log("database connected successfully")
  }catch(err){
    console.log("database connection failed ")
    console.log(err.stack)
    
  }
}

  //individal schema of task 
  const taskSchema = new mongoose.Schema({
    Name:String,
    Description:String,
    Status:Boolean
  })
     // user profile task schema 
  const userSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
      },
    email:{
        type: String,
        required: true
      },
      Tasks:
      [taskSchema]
  });
  
   //model creation

  const user = mongoose.model('user',userSchema)

module.exports = {
connection,taskSchema,userSchema,user
}
