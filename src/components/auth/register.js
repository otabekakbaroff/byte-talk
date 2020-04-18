import React,{useState} from "react";
import axiosWithAuth from "../axiosWIthAuth";
function Register(props){
    const [login,setLogin]=useState({
        username:'',
        password:''
    });

    const handleChange=e=>{
        console.log(`${e.target.name}:${e.target.value}`)
        setLogin({
            ...login,
            [e.target.name]:e.target.value
        }) 
      }

    const RegisterSubmit=e=>{
        e.preventDefault();
        axiosWithAuth().post('/api/auth/user/register', login)
        .then(response=>{
            console.log(response);
            props.history.push('/profile');
        })
        .catch(err=>{
          console.log(err);
        })
    }
    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={RegisterSubmit}>

                <input placeholder=" name" name="name" type="text" onChange={handleChange} id="name"/>

                <input placeholder=" username" name="username" type="text" onChange={handleChange} id="username"/>

                <input placeholder=" password" name="password" type="password" onChange={handleChange} id="password"/>
  
                <button type="submit">Log In</button>

            </form>
        </div>
    )
}

export default Register;