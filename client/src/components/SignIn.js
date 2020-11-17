import React, {useState} from 'react'
import {divStyles, inputStyles, labelStyles} from '../styles'
import {useGlobalState} from '../config/store'
import {loginUser} from "../services/authServices"

const SignIn = ({history}) => {
    const initialFormState = {
        username: "",
        password: ""
    } 
    const [userDetails,setUserDetails] = useState(initialFormState)
    const {dispatch} = useGlobalState()

    const [errorMessage, setErrorMessage] = useState(null)

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        loginUser(userDetails)
                .then(() =>{
                    dispatch({
                        type: "setLoggedInUser",
                        data: userDetails.username
                    })
                     history.push("/")
                })
                .catch(error => {
                    if(error.response && error.response.status === 401)
                        setErrorMessage("Authentication failed, please check user name and password")
                    else
                        setErrorMessage("There may be a problem with the server please try later")
                })
       
    }
    // Login user : this pnly updates state
    // function loginUser() {
    //     dispatch({
    //     type: "setLoggedInUser",
    //     data: userDetails.username
    //     })
    // }

    const errorStyles = {
        color: "red"
    }
    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <p style={errorStyles}>{errorMessage}</p>}
            <div style={divStyles}>
                <label style={labelStyles}>Username</label>
                <input style={inputStyles} required type="text" name="username" placeholder="Enter a username" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Password</label>
                <input style={inputStyles} required type="password" name="password" placeholder="Enter a password" onChange={handleChange}></input>
            </div>
            <input type="submit" value="Login"></input>
            
        </form>
    )
}
export default SignIn