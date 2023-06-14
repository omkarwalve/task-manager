import React from 'react'
import { Link } from 'react-router-dom';




function Navbar(){

    
    return(<div>


<nav className="navbar navbar-expand-sm  navbar-custom-height">
  <div className="container-fluid">
    <a className="navbar-brand text-light" >Task Manager</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto custom-navbar-flex ">
    
       
        <Link to="/" className="nav-link text-light active" aria-current="page" >Home</Link>
        <Link to="/contact" className="nav-link text-light " >Contact</Link>
       
        
        
      </div>
    </div>
  </div>
</nav>
    
    
    
    
    </div>)
}

export default Navbar;