import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



function Contact (){

    const [contactinfo,setcontactinfo]=useState({name:"",email:"",Message:""})
    const [formerrors,setformerrors]=useState({})
    const [isSubmit,setisSubmit]=useState(false)
    const [hidden,sethidden]=useState(false)
    const [sendmessage,setsendmessage]=useState("")
    const navigator = useNavigate()

    const handleSubmit=(e)=>{
      e.preventDefault()
      setformerrors(validate(contactinfo))
      setisSubmit(true)

    }
    const validate=(contactinfo)=>{
        const errors={}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!contactinfo.name){
            errors.name = "Name is required!"
        }
        if(!contactinfo.email){
            errors.email = "Email is required!"
        }else if(!regex.test(contactinfo.email)){
            errors.email ="Please enter valid email format"
        }
        if(!contactinfo.Message){
            errors.Message = "Message is required!"
        }

        return errors
    }
    const handleClick=()=>{
        async function sendmail(){
            const responsestore = await fetch("https://task-manager-1uk3.onrender.com/contact",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                  },   
                  body: new URLSearchParams({
                    
                    'name': contactinfo.name,
                    'email': contactinfo.email,
                    'message': contactinfo.Message
                    
                })
              })
              .catch((err)=>console.log(err))

              const message = await responsestore.json()
              if(message.send){
                console.log("Message send successfully")
                setsendmessage("Message send successfully")
                sethidden(true)
                setTimeout(()=>{
                    navigator('/')
                }, 5000);

                

              }else{
                console.log("Error while sending message , please try again.")
                setsendmessage("Error while sending message , please try again.")
              }

            }
            sendmail()
    }
    const handleChange=(event)=>{
        const {name,value} = event.target
        setcontactinfo(()=>{
            return{
                ...contactinfo,
                [name]:value
            }
        })
    }
    useEffect(()=>{
        if(Object.keys(formerrors).length===0 && isSubmit){
            handleClick()
          }
        },[formerrors])


    return(<div >
           <div className="ack container-fluid" hidden={!hidden} >
          <p >{sendmessage}</p>
          <p> Redirecting to Home ...</p>
          </div>
         <div className="get-profile-div container-fluid" hidden={hidden}>
        
        <div className="get-task-box">
        
        <h4>Contact us</h4>
        <form onSubmit={handleSubmit}>

        
        <input name="name"  onChange={handleChange} className="name" placeholder="Name" value={contactinfo.name}/>
        <p>{formerrors.name}</p>
        <input name="email"  onChange={handleChange} className="email" placeholder="Email" value={contactinfo.email}/>
            <p>{formerrors.email}</p>
            <textarea name="Message"  onChange={handleChange} className="message" placeholder="Message" value={contactinfo.Message} />
             <p>{formerrors.Message}</p>
             <button className="btn btn-light contactsubmit">Submit</button>   
        </form>
        </div>
            
             </div>
    </div>)
}


export default Contact;