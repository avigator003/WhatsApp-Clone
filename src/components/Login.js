import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../firebase'
import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'
import './Login.css'
function Login() {
const[{},dispatch]=useStateValue();

const signIn=()=>{
    auth.signInWithPopup(provider).then(result=>{
        dispatch({
            type:"SET_USER",
            user:result.user
        })
    })
}

    return (
        <div className="login">
            <div className="login__container">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/766px-WhatsApp.svg.png"/>
            <div className="login__text">
              <h1>Sign In Watsapp</h1>
            </div>
            <Button type="submit" onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login
