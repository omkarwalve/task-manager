import React from "react";
 
// We use Route in order to define the different routes of our application
import { BrowserRouter, Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from './components/Navbar'
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";

 
const App = () => {
 return (
  
   <div>
    <BrowserRouter>
     <Navbar />
     <Tasks />
     <Footer />
     </BrowserRouter>
   </div>
   
 );
};
 
export default App;