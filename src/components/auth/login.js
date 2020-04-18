import React,{useState} from "react";
import axiosWithAuth from '../axiosWIthAuth';
function Login(props){
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
      const LoginSubmit=e=>{
        e.preventDefault();
        axiosWithAuth().post('/api/auth/user/login', login)
        .then(response=>{
            localStorage.setItem('name', response.data.user.name);
            localStorage.setItem('id', response.data.user.id);
            localStorage.setItem('token', response.data.token);
            props.history.push('/users');
        })
        .catch(err=>{
          console.log(err);
        })
      }
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={LoginSubmit} >

                <input placeholder=" username" name="username" type="text" onChange={handleChange} id="username"/>

                <input placeholder=" password" name="password" type="password" onChange={handleChange} id="password"/>
  
                <button type="submit">Log In</button>

            </form>
        </div>
    )
}

export default Login;