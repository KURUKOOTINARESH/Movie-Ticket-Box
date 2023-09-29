import './App.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from "./assets/logo.png"


import { Routes,Route,useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from "./components/Login"
import Home from './components/Home';
import Movie from './components/Movie';
import SelectSeat from './components/SelectSeat';
import Success from './components/Success';


function App() {
  const [userLoged,setUserLoged] = useState('')
  const userData = JSON.parse(localStorage.getItem("userTB"))
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("userTB"))
    if(userData){
      setUserLoged(userData.isLoggedin)
    }
  },[userLoged])
  
  const navigate = useNavigate()
  
  
  return (
    <div className="App">      
      
      <Navbar className="bg-body-tertiary">
        <Container className='nav-container' style={{display: "flex",
    justifyContent: "space-between",alignItems:"center"}}>
          <Navbar.Brand onClick={()=>navigate("/")} className='nav-logo-con'>
            <img src={logo} alt='logo' className='navbar-logo'/>
            <h2>TICKET BOX </h2>           
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
           {userLoged && <button 
            className='login-button'
            onClick={()=>{
              localStorage.setItem("userTB",JSON.stringify({...userData,isLoggedin:false}))
              setUserLoged(false)
              navigate("/login")
            }}
            >Logout</button>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login setUserLoged={setUserLoged}/>}></Route>
        <Route path="/movie/:id" element={<Movie/>}></Route>
        <Route path="/select" element={<SelectSeat/>}></Route>
        <Route path="/success" element={<Success/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
