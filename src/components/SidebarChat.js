import { Avatar } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import "./SideBarChat.css"

function SidebarChat({addNewChat,name,id}) {

const[messages,setMessages]=useState("");
const createChat=()=>{
    const roomName=prompt("Enter The Room Name");
    if(roomName)
    {
            db.collection("rooms").add({
            name:roomName
        })

    }
}

useEffect(()=>{
if(id)
{
    db.collection("rooms").doc(id).collection("messages").orderBy("timestamp",'desc').onSnapshot(snapshot=>{
        setMessages(snapshot.docs.map(doc=>doc.data()))
    }

    )
}


},[id])


    return !addNewChat? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChats">
            <Avatar   style={{marginTop:"20px"}}/>
            <div className="sidebar__chatInfo">
           <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ):(<div className="sidebarChats" onClick={createChat}>
      <h2>Add New Chat</h2>
    </div>);
}

export default SidebarChat
