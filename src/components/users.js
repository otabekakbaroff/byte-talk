import React,{useState, useEffect} from 'react';
import axiosWithAuth from './axiosWIthAuth';

function Users(props){
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        axiosWithAuth().get('/user').then(res=>{
            setUsers(res.data)
        })
    },[])

    const handleChange=(e)=>{
        localStorage.setItem('senderName', e.target.name)
        localStorage.setItem('senderId',e.target.id)
        props.history.push('/profile');
    }
    return(
        <div>
            <h1>USERS</h1>
            {
                users.map(item=>(
                <div  className="users" key={Math.random()*10000000}><h3>{item.name}</h3><button id={item.id} name={item.name}onClick={handleChange}>CHAT</button></div>
                ))
            }
        </div>
    )
}

export default Users;