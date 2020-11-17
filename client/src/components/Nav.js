import React from 'react'
import {Link} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {logoutUser} from "../services/authServices"


const Nav = () => {

    // Logout user
    function handleLogout() {   
        logoutUser().then((response) => {
            console.log("Got back response on logout", response.status)
        }).catch ((error) => {
            console.log("The server may be down - caught an exception on logout:", error)
        })
        // Even if we catch an error, logout the user locally
        dispatch({
            type: "setLoggedInUser",
            data: null
        })
    }
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    return (
        <div  class="nav">
            {loggedInUser 
            ? (<div>
                <Link class="nav-link" to="/">{loggedInUser}</Link>
                <Link class="nav-link" onClick={handleLogout} to="/">Logout</Link>
                </div>)
            : (<div>
                <Link class="nav-link" to="/">Guest</Link>
                <Link class="nav-link" to="/auth/login">Login</Link>
                <Link class="nav-link" to="/auth/register">Register</Link>
                </div>)
            }
            <div >
                <Link class="nav-link" to="/">Home</Link>
                <Link class="nav-link" to="/posts/new">Add a post</Link>
            </div>
        </div>
    )
}

export default Nav