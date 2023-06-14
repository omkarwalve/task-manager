import React, { useEffect, useState } from "react"

let user = {name:"",email:""}

function GetProfile(props){
    const [userinfo, setuserinfo]=useState({name:"",email:""})
    const [formerror,setformerror]=useState({})
    const [isSubmit , setisSubmit]=useState(false)

    function handleChange(event){
        const {name,value}=event.target;
       setuserinfo(()=>{
        return {
            ...userinfo,
            [name]:value
        }
    });
}

   const handleSubmit=(e)=>{
    e.preventDefault()
    setformerror(validate(userinfo))
    setisSubmit(true)

   }

   const validate =(userinfo)=>{
    const errors={};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!userinfo.name){
        errors.name = "Name is required!"
    }
    if(!userinfo.email){
        errors.email = "Email is required!"
    }else if(!regex.test(userinfo.email)){
        errors.email ="Please enter valid email format"
    }

 return errors
   }

   function handleClick(){
    

     user.name=userinfo.name;
     user.email=userinfo.email;
     props.setprofile(true);

   }
  

   useEffect(()=>{
    if(Object.keys(formerror).length===0 &&isSubmit){
        handleClick()
    }
   },[formerror])

    
    return(
        <div className="get-profile-div">
           
            <div className="get-profile-box">
            <h3>Create user account</h3>
            <form onSubmit={handleSubmit}>
            <input name="name"   onChange={handleChange} className="name" placeholder="Name" value={userinfo.name}/>
            <p>{formerror.name}</p>
            <input name="email"  onChange={handleChange} className="email" placeholder="Email" value={userinfo.email} />
            <p>{formerror.email}</p>
             <button className="btn btn-light submit">Submit</button>   
            </form>
        
             </div>
        </div>
    )
}
export default GetProfile
export {user}