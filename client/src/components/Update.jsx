import React, { useEffect, useState } from "react";
import UserTasksDB from "./UserTasksDB";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Update(){
    const location = useLocation()
    const [res,setres]=useState(location.state)  
    const [check,setcheck]=useState(res.Status) 
    const [formerror,setformerror]=useState({})
    const [isSubmit,setisSubmit]=useState(false)
    const navigator=useNavigate();
    
    
      function handlechange(event){
        const {name,value} = event.target
        setres(()=>{
            return{
                ...res,
                [name]:value
            }
        })

      }

      function handleclick(){
        
        async function updateDB(){
          const responsestore = await fetch("https://task-manager-1uk3.onrender.com/update",{
              method:'POST',
              headers:{
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
                },   
                body: new URLSearchParams({
                  
                  'Name': res.Name,
                  'Description': res.Description,
                  'Status': res.Status,
                  '_id':res._id
                  
              })
            })
            .catch((err)=>console.log(err))
            
            const message = await responsestore.json()

           if(message.updated){
            navigator('/')
           }else{
            alert("updation failed")
           }

      }
      updateDB();
    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      setformerror(validate(res))
      setisSubmit(true)
    }

    const validate=(res)=>{
      const errors={}
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if(!res.Name){
        errors.name ="Name is required!"
      }
      if(!res.Description){
        errors.description ="Description is required!"
      }
      
      return errors
    }

    useEffect(()=>{
      if(Object.keys(formerror).length===0 && isSubmit){
        handleclick()
      }
    },[formerror])
    
    return(
        
        <div className="get-profile-div container-fluid">
        
        
        <div className="get-task-box">
        <h4>Update Task </h4>
        <form onSubmit={handleSubmit}>
        <input name="Name"   onChange={handlechange} className="name" placeholder="Name" value={res.Name}/>
           <p>{formerror.name}</p>
            <textarea name="Description"  onChange={handlechange} className="description" placeholder="Description" value={res.Description} />
            <p>{formerror.description}</p>
            <div onChange={handlechange} className="email">
             <h6>Status</h6>
             <label for="status">Complete </label>  <input type="radio" className="radios radios-one" checked={check===true} onChange={(e)=>setcheck(true)} value={true} name="Status" /><br/> 
             <label for="status">Incomplete </label> <input type="radio" className="radios" checked={check===false} onChange={(e)=>setcheck(false)} value={false} name="Status" /> 
             </div>
             
             <button  className="btn btn-light createsubmit">Done</button>   
             
        </form>
        </div>
         </div>   
            
    
    )
}

export default Update;