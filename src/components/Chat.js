import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import db from '../firebase';
import "./Chat.css"
import firebase from 'firebase'
import { useStateValue } from '../StateProvider';
function Chat() {


  const[message,setMessage]=useState("");
  const[messages,setMessages]=useState([]);
  const[roomName,setRoomName]=useState("");
  const {roomId}=useParams();
  const[{user},dispatch]=useStateValue();

  useEffect(()=>{
   if(roomId)
   {
    db.collection("rooms").doc(roomId).onSnapshot((snapshot)=>{
     setRoomName(snapshot.data().name)
     })

     db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot=>{
       setMessages(snapshot.docs.map(doc=>doc.data()))
     })
   }
  },[roomId]);

  const sendMessage=(e)=>{
       e.preventDefault(); 
       db.collection("rooms").doc(roomId).collection("messages").add({
         name:user.displayName,
         timestamp:firebase.firestore.FieldValue.serverTimestamp(),
         message:message
       })

       setMessage(""); 
 }
    return (
        <div className="chat">
         <div className="chat__header">
          <Avatar/>
        <div className="chatHeader__info">
           <h2>{roomName}</h2>
           <p>
             last Message {" "}
             {
               new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
             
           </p>
        </div>

        <div className="chatHeader__right">
        <IconButton>           
         <SearchOutlined/>
        </IconButton>
        <IconButton>     
          <AttachFile/>
        </IconButton>
        <IconButton>     
          <MoreVert/>
       </IconButton>
        </div>
         </div>
 
 <div className="chat__body">
   {messages.map(message=>(
   <p className={`chat__message ${message.name==user.displayName && "chat__reciever"}`}>
   <span className="chat__name">{message.name}</span>{message.message}
   <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
   
   </p>
))}
 </div>

<div className="chat__footer">
<InsertEmoticon/>
<form>
<input placeholder="Type a message" type="text"  value={message}  onChange={(e)=>setMessage(e.target.value)}/>
<button  onClick={sendMessage} type="submit">Send a message</button>
</form>
<Mic/>
</div>


        </div>
    )
}

export default Chat
