import React, { useState } from 'react'
import ShowTasks from './ShowTasks';
import GetProfile from './GetProfile';


function Tasks(){
    let [profile,setprofile]=useState(false)
//check if the user has its database and then only render user tasks

    return(<div className="content-bg">{profile===false? (<GetProfile setprofile={setprofile}/>):(<ShowTasks />)}</div>)
}

export default Tasks;
