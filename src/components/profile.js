import React,{useState, useEffect} from 'react';
import axiosWithAuth from './axiosWIthAuth';
import io from "socket.io-client"
const socket = io('http://localhost:5000')

function Profile(props){
    const [conversation,setConversation]=useState([]);
    const [sendMessage,setsendMessage]=useState({
        dateDiggits:Date.now(),
        dateString: todaysDateAndTime(),
        message:"",
        sender_id:localStorage.getItem('id'),
        receiver_id:localStorage.getItem('senderId')
    });
    useEffect(()=>{
        axiosWithAuth().get(`/user/messages/${localStorage.getItem('id')}/${localStorage.getItem('senderId')}`)
        .then(res=>{  
            setConversation(res.data)
        })
        window.scrollTo(0,document.body.scrollHeight);
        socket.on("server-message",message=>{
            console.log(message)
            setConversation(message);
        })
    },[])
    useEffect(()=>{
        if(conversation.length!==0){
            window.scrollTo(0,document.body.scrollHeight);
        }
        window.scrollTo(0,document.body.scrollHeight);
    },[conversation])
  
  
    function todaysDateAndTime(){
        let currentDate = new Date();
        let amOrpm='';
        let date = currentDate.getDate();
        let month = currentDate.getMonth();
        let year = currentDate.getFullYear();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        if(hours===0 || hours<12){
        amOrpm="AM";
        }else if(hours>=12){
        amOrpm="PM";
        }
        return `${date}/${month}/${year} ${hours}:${minutes}${amOrpm}`;
    }
    
    const onSubmit=e=>{
        e.preventDefault();

        setConversation([...conversation,{...sendMessage,name:`${localStorage.getItem('name')}`,senderOrReceiver:"sender"}]);
        socket.emit("convo", [...conversation,{...sendMessage,name:`${localStorage.getItem('name')}`,senderOrReceiver:"sender"}])
        setsendMessage({
            ...sendMessage,
            dateDiggits:Date.now(),
            dateString:todaysDateAndTime(),
        })
        axiosWithAuth().post('/message/send', sendMessage);
        window.scrollTo(0,document.body.scrollHeight);
        
    }
    const handleChange=e=>{
        setsendMessage({
            ...sendMessage,
            message: e.target.value
        })
    }
    return(
        <div className="profile" onSubmit={onSubmit}>
            <h2>Say Hi To {localStorage.getItem('senderName')}</h2>
            {conversation.map(item=>(
                <div className={item.senderOrReceiver} key={Math.random()*999999999}><h3>{item.name} says...</h3><br></br>{item.message}</div>
            ))}
            <form id="sendTextInputField">
                 <input onChange={handleChange}  name="message" placeholder=" Write..." type="text" id="message"/>
                 <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Profile;