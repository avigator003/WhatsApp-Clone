import { Avatar, IconButton } from '@material-ui/core'
import { Chat, MoreVert, SearchOutlined } from '@material-ui/icons'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import "./Sidebar.css"
import React, { useEffect, useState } from 'react'
import SidebarChat from './SidebarChat'
import db from '../firebase'
import { useStateValue } from '../StateProvider'

function Sidebar() {

  const[rooms,setRooms]=useState([]);
  const[{user},dispatch]=useStateValue();

    useEffect(()=>{
          const unsubscribe= db.collection("rooms").onSnapshot((snapshot)=>
          setRooms(snapshot.docs.map((doc)=>({
          id:doc.id,
          data:doc.data()
    })))
  )
  return ()=>{
    unsubscribe();
  }
   },[])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
            <Avatar src={user?.photoURL}/>
            <div className="sidebar__headerRight">
                <IconButton>           
                  <DonutLargeIcon/>
                </IconButton>
                <IconButton>     
                  <Chat/>
                </IconButton>
                <IconButton>     
                  <MoreVert/>
                </IconButton>
           </div>
          </div>
            <div className="sidebar__search">
                <div className="search__container">
            <SearchOutlined/>
            <input type="text" placeholder="Search for a Chat"/>
            </div>
            </div>
            <div className="sidebar__chats">
              
            <SidebarChat addNewChat={true} />
            {
              rooms.map(room=>(
                <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
              ))
            }
            </div>



        </div>
    )
}

export default Sidebar
