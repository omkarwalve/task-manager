
import React, { useEffect, useRef, useState } from "react";
import {user} from "./GetProfile"
import {Link ,useNavigate} from 'react-router-dom';



function UserTasksDB(){
   const navigator = useNavigate()
    const [data, setdata]=useState(null)

    const [process,setprocess]=useState(false)
    

  
   

   
   
    const  storeUserToDB =async ()=>{
      const responsestore = await fetch("https://task-manager-1uk3.onrender.com/",{
         method:'POST',
         headers:{
             'Content-Type': 'application/x-www-form-urlencoded',
             'Accept': 'application/json'
           },   
           body: new URLSearchParams({
             'name': user.name,
             'email': user.email,
         })
       })
       .catch((err)=>console.log(err))
  
       
     }
  
     const getDataFromDB = async ()=>{
      const responseget = await fetch("https://task-manager-1uk3.onrender.com/").catch((err)=>console.log(err))
      const jsonResp = await responseget.json()
      setdata(jsonResp)

     
     }

    const Delete = async (id)=>{

      await fetch("https://task-manager-1uk3.onrender.com/delete",{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },   
          body: new URLSearchParams({
            'id': id
           
        })
      })
      .catch((err)=>console.log(err))

      setprocess(true)

      // navigator('/')
 


     
    }
     
  
      useEffect(()=>{
        
         storeUserToDB();
        
        getDataFromDB()
       
  
      },[process])

      function handleclick(id,event){
        
        if(event.target.name==="create"){
        navigator('/'+event.target.name)
      }else if(event.target.name==="update"){
        
        navigator("/update",{state:id})
      }else {
        setprocess(false)
        Delete(id);

    
      }
      }
     
      
    return(
    
  
    
    <div className="container-fluid task-div">
   <div className="header-section">
   <h3 className="task-header">Tasks</h3>
    <button  name="create" onClick={(e)=>handleclick(null,e)} className="btn btn-outline-secondary create-button">Create new Task</button>
   </div>
    
    <p hidden={data?.Tasks.length>0}>You have no tasks , Create new tasks.</p>
      <div className="row">
     { data?.Tasks?.slice(0).reverse().map((res) => (

      <div className="col-lg-2 col-md-4 col-sm-6"  key={res._id}>
          <div className="card">
          <h5  className="card-title" value={res.Name}>{res.Name}</h5>
          <h6  style={res.Status?{color:"darkturquoise"}:{color:"orangered"}} value={res.status}>{res.Status?"Complete":"Incomplete"}</h6>
          <p className="card-text" value={res.Description}>{res.Description}</p>
          <button  name="update" onClick={(e)=>handleclick(res,e)} className="btn btn-outline-secondary update-button">Update</button>
          
          <button  name="delete" onClick={(e)=>handleclick(res._id,e)} className="btn btn-outline-secondary delete-button">✖</button>
          
          </div>
          </div>
      
      
      ))
      }
      </div>
     
     
      

      
      
      
      

    </div>)
}



export default UserTasksDB
