import React, {useState,useContext} from 'react'
import {UserContext} from '../../App'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Login=()=>
{
    const{state,dispatch}=useContext(UserContext)
    const history=useHistory()
    
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")

    const PostData=()=>
    {
        //Checkin the email pattern is valid or not
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email))
        {
            M.toast({html: "Invalid email", classes: "#f44336 red"})
            return
        }
        //Requesting to server SIGNUP
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type" :"application/json"//jo postman mai likhte hai
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>
            {
                console.log(data)
                if(data.error)
                {
                    M.toast({html: data.error, classes: "#f44336 red"})
                }
                else{
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))

                    dispatch({type :"USER",payload:data.user})

                    M.toast({html: "Signed in Successfully", classes: "#388e3c green darken-2"})
                    history.push('/')
                }
            }).catch(err=>
                {
                    console.log(err)
                })
    }

    return (

        <div className="mycard">
            <div className=" card auth-card">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light" 
                onClick={()=> PostData()}>
                        Login
                </button>
                <h6>
                    <Link to="/signup">Create Account</Link>
                </h6>
            </div>
        </div>
    )
}

export default Login