import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './components/Login';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
function App() {

  const[{ user },dispatch]=useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
        if(authUser)
        {
      dispatch({
    type:"SET_USER",
    user:authUser
    
})
        }
        else{
             dispatch({
                type:"SET_USER",
                user:null
             })
        }
        })
},[])


  return (

    <div className="app">
      {!user?(<Login/>):(<div className="app__body">
        <Router>
           <Sidebar/>
          <Route path="/rooms/:roomId"><Chat/></Route>
           <Route path="/"></Route>
                </Router>
      </div>
)

      }
          </div>
  );
}

export default App;
