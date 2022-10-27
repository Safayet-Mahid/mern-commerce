import { useState } from "react"
import "./login.css"
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

export default function AdminLogin() {
    
    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const dispatch = useDispatch();

const handleLogin = (e)=>{
    e.preventDefault()
    login(dispatch, { username, password });
}

  return (
    <div className="login-wrapper">
        <input  type="text" placeholder="username" onChange={e=>setUsername(e.target.value)} className="login-input"  />
        <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}  className="login-input"/>

        <button onClick={handleLogin} className="login-btn">Login</button>
    </div>
  )
}
