import "./login.css"
import axios from "axios"
import {useDispatch} from "react-redux"
import { updateLogin, updateRole } from "../redux/actions"
import { useNavigate } from "react-router-dom"

export const Login = ()=>{

  let dispatch = useDispatch()
  let navigate = useNavigate()

  function handleLoginSubmit(e){
    e.preventDefault()
    let admin_email = e.target[0].value
    let admin_password = e.target[1].value
    console.log(admin_email,admin_password)
    let obj = {
      admin_email,
      admin_password
    }
    axios.post("http://localhost:9000/login",obj)
    .then((res)=>{
      localStorage.setItem("token", JSON.stringify(res.data.Message))
      localStorage.setItem("role", JSON.stringify(res.data.role))
      dispatch(updateLogin(true))
      dispatch(updateRole(res.data.role))
      navigate("/")
    })
  }


  return (
    <div className="maincontaineroflogin">
      <form onSubmit={handleLoginSubmit}>
        <input type="email" placeholder="Enter Email" required/>
        <input type="password" placeholder="Enter Password" required/>
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}