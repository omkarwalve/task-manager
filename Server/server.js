const express = require('express')
const mongoose  = require('mongoose')
const cors = require("cors")
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer");
const path = require("path");

require('dotenv').config()

const app = express()


app.use(bodyParser.urlencoded({extended : true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors())
const port = process.env.PORT;
//connection of mongodb 
const conn = require('./route/mongodb-connection.js')
conn.connection()


let userName="" ;
let emailAdd="" ;


// post route when the form submission will be done , it will check if user has database. redirect to home route in frontend
app.post('/',async(req,res)=>{
    const name = req.body.name
    const email=  req.body.email

    userName = name;
    emailAdd = email;
     
    const result = await conn.user.findOne({Name:name,email:email})
    if(result!=null){
        res.json({user:true,message:"user has a task database"})
        
    }else{
        res.json({user:false,message:"user is new "})
        try{
            const newUser = new conn.user({Name:name,email:email,Tasks:[]})
            await newUser.save()
            console.log("user saved successfully");
        }catch(err){
            console.log('user data failed to save error :'+err.stack)
        }
        
    }
})

//get route find the document in database and return the result as json

app.get('/',async (req,res)=>{

        const result = await conn.user.findOne({Name:userName,email:emailAdd})
        res.json(result)
    

})
//adding new task
app.post('/newtask',async(req,res)=>{
    
    const task = {Name:req.body.Name,Description:req.body.Description,Status:req.body.Status}
    
   try{
 const response = await conn.user.findOneAndUpdate(
   { Name:userName , email:emailAdd }, 
   { $push: { Tasks: task  } }
 )
  if(response!=null){
    console.log('added '+task.Name+" successfully to the db");
     res.json({message:"success"})
    }else {
        console.log("could not add to the database"); 
        res.json({message:"failed"})
    }
 }catch(err){
    console.log(req.body.task)
    console.log('failed to update the task err: '+err.stack)
    res.json({message:"failed error :"+err.stack})
    
   }
})

//updating task 
app.post("/update",async (req,res)=>{

  const task = {Name:req.body.Name,Description:req.body.Description,Status:req.body.Status,_id:req.body._id}
  

  
const id = new mongoose.Types.ObjectId(task._id) // take id in form of string and convert to object id for querying
 const response= await conn.user.updateOne(
    {  "Tasks._id": id },
    {
        '$set': {
            "Tasks.$.Name": task.Name,
            "Tasks.$.Description": task.Description,
            "Tasks.$.Status":task.Status
         }
    } 
    
)
if(response.acknowledged && response.modifiedCount===1){console.log("updated success");res.json({updated:true,message:"success"})}
else {console.log('invalid '+response.modifiedCount) ; res.json({updated:false,message:"failed"})}

})

//delete whole task 

app.post('/delete',async (req,res)=>{
    const taskid = req.body.id 
    
    const id  = new mongoose.Types.ObjectId(taskid)
     console.log(id)

    const response = await conn.user.updateOne({"Tasks._id":id},{
        $pull:{
         Tasks:{_id : id}
        }
    })
    if(response.acknowledged && response.modifiedCount===1){console.log("updated success");res.json(response)}
    else console.log('invalid')
})


//send contact info to your email

app.post('/contact',async (req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const message=req.body.message
    subject="Regarding task manager website"

   
    async function mainMail( name, email ,subject, message) {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use TLS
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.PASSWORD,
            },
            tls: {
              // do not fail on invalid certs
              rejectUnauthorized: false,
            },
          });
        
        const mailOption = {
          from: "http://localhost:3000",
          to: process.env.GMAIL_USER,
          subject: subject,
          html: `You got a message from 
          Email : ${email}
          Name: ${name}
          Message: ${message}`,
        };
        try {
          await transporter.sendMail(mailOption);
          return Promise.resolve("Message Sent Successfully!");
        } catch (error) {
          return Promise.reject(error);
        }
      }
      


      
  try {
    await mainMail(name, email, subject, message);
    res.json({send:true,message:"Message Successfully Sent!"});
  } catch (error) {
    console.log(error.stack)
    res.json({send:false,message:"Message Could not be Sent"});
  }

    
})

app.listen(port,()=>{
    console.log(`Server running ar port ${port}`)
});

