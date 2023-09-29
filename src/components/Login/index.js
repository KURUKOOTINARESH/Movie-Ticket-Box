import React from 'react'
import "./index.css"

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import loginPageImage from "../../assets/loginPageImage.png"

const Login = ({setUserLoged}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [errMsg,setErrMsg] = useState('')

  const [status,setStatus] = useState('login')

  const navigate = useNavigate()

  const onLogin = (e)=>{
    e.preventDefault()
    if(status === "login"){
            const userData = JSON.parse(localStorage.getItem("userTB"))
        if(userData){
            if(email === userData.email && password === userData.password){
                localStorage.setItem("userTB",JSON.stringify({...userData,isLoggedin:true}))
                setErrMsg("")
                setUserLoged(true)
                navigate("/")
            }
            else{
                setErrMsg("Invalid username or password")
            }
        }else{
            setErrMsg("User does not exist, Please Sign Up")
        }
    }
    else{
        if(password === confirmPassword){
            let data = {
                email,
                password,
                confirmPassword,
                isLoggedin:false
              }
            localStorage.setItem("userTB",JSON.stringify(data))
            setErrMsg("")
            setStatus('login')
        }else{
            setErrMsg("Password not matched, Please confirm again")
        }
        
    }
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <div className='login-page'>

            <div className='login-page-img-con'>
                <img src={loginPageImage} alt='login-page' className='login-page-img'/>
            </div>
        
            <div className='login-content'>
                <form onSubmit={onLogin}>
                    <div className='input-fields-con'>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <div className='input-fields-con'>
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>

                    {status === "signUp" && 
                    <div className='input-fields-con'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input id='confirmPassword' type='password' placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                    </div>
                    }

                    {status==="login" ? 
                    
                    <div style={{display:"flex",gap:"1rem"}}>
                        <button type='submit' className='start-shopping-btn'>Login</button>
                        <button type='button' className='start-shopping-btn' 
                        onClick={()=>{
                            let data = {
                                email:"123@gmail.com",
                                password:"123",
                                confirmPassword:"123",
                                isLoggedin:true
                              }
                              localStorage.setItem("userTB",JSON.stringify(data))
                              setUserLoged(true)
                              
                              navigate("/")
                        }}
                        >Login as a Guest</button>
                    </div>
                    :
                    <button type='submit'  style={{width:"100%"}} className='start-shopping-btn'>Sign Up</button>
                    }

                    {status==="login" ?
                    <p>New here? Please <span className='click-here-text' onClick={()=>{setEmail("");setErrMsg("");setPassword("");setStatus("signUp");}} style={{color:"black",textDecoration:"underline"}}>Sign Up</span></p>
                    :
                    <p>Already a member? Please <span className='click-here-text' onClick={()=>{setEmail("");setErrMsg("");setPassword("");setStatus("login");}} style={{color:"black",textDecoration:"underline"}}>Login</span></p>
                    }
                    
                    
                    <p style={{color:"red"}}>{errMsg}</p>
                </form>
            </div>
            
    </div>
  )
}

export default Login