import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Create(){
    const [task,settask]=useState({name:"",description:"",status:""})
    const [formerrors,setformerrors]=useState({})
    const [isSubmit,setisSubmit]=useState(false)
    const navigate = useNavigate()
    
    function handleChange(event){
        const {name,value} = event.target
        settask(()=>{
            return{
                ...task,
                [name]:value
            }
        })
    }

    const handleSubmit = (e)=>{
      e.preventDefault()
      setformerrors(validate(task))
      setisSubmit(true)
    }
    const validate = (task)=>{
        const errors={}
        if(!task.name){
            errors.name = "Name is required!!"
        }
        if(!task.description){
            errors.description = "Description is required!"
        }
        if(!task.status){
            errors.status = "Status is required!"
        }

        return errors
        
    }

    function handleClick(){
        async function saveDB(){
            const responsestore = await fetch("https://task-manager-1uk3.onrender.com/newtask",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                  },   
                  body: new URLSearchParams({
                    
                    'Name': task.name,
                    'Description': task.description,
                    'Status': task.status
                    
                })
              })
              .catch((err)=>console.log(err))

              const message = await responsestore.json()
              console.log(message)

              if(message.message=="success"){
                console.log("added successfully")
                navigate('/')


              }else{
                console.log("error")
              }
        }
        saveDB();
    }

    useEffect(()=>{

        if(Object.keys(formerrors).length===0 && isSubmit)
        {
            handleClick()
        }

    },[formerrors])


    return(

        <div className="get-profile-div container-fluid">
        
        <div className="get-task-box">
        
        <h4>Create Task</h4>
        <form onSubmit={handleSubmit}>

        
        <input name="name"  onChange={handleChange} className="name" placeholder="Name" value={task.name}/>
        <p>{formerrors.name}</p>
            <textarea name="description"  onChange={handleChange} className="description" placeholder="Description" value={task.description} />
            <p>{formerrors.description}</p>
            <div onChange={handleChange} className="email">
             <h6>Status</h6>
             <label for="status">Complete </label>  <input type="radio" className="radios radios-one" value={true} name="status" /><br/> 
             <label for="status">Incomplete </label> <input type="radio" className="radios" value={false} name="status" /> 
             </div>
             <p>{formerrors.status}</p>
             <button className="btn btn-light createsubmit">Submit</button>   
        </form>
        </div>
            
             </div>
    )
}

export default Create