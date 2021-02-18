import React,{useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import M from 'materialize-css'

const Signup=()=>
{
    const history=useHistory()
    const [name,setName]=useState("")
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
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type" :"application/json"//jo postman mai likhte hai
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>
            {
                if(data.error)
                {
                    M.toast({html: data.error, classes: "#f44336 red"})
                }
                else{
                    M.toast({html: data.message, classes: "#388e3c green darken-2"})
                    history.push('/login')
                }
            }).catch(err=>
                {
                    console.log(err)
                })
    }

    return (
        <div>
            <div className="mycard">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
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
                onClick={()=>PostData()}
                >
                        Signup
                </button>
                <h6>
                    <Link to="/login">Have an Account?</Link>
                </h6>
            </div>
            </div>
        </div>
    )
}
export default Signup