import React, { useEffect, useRef, useState } from "react";
import {user} from "./GetProfile"
import { BrowserRouter ,Routes, Route, Link } from 'react-router-dom';
import Create from "./Create";
import Contact from "./Contact";
import Update from "./Update";
import UserTasksDB from "./UserTasksDB";


function ShowTasks(){
    

    
    //update section 
    

 
    return(<div>
     
     {/* set the routes for the app */}
     
         <Routes>
         <Route exact path='/' element={<UserTasksDB />}></Route>
                 <Route exact path='/create' element={<Create />}></Route>
                 <Route exact path='/contact' element={<Contact />}></Route>
                 <Route exact path='/update' element={<Update />}></Route>
          </Routes>
     
     
      
      
        
    </div>)
}

export default ShowTasks;