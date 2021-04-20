import React ,{useContext}from 'react'
import {Link, useHistory} from 'react-router-dom';
import { UserContext } from "../App";
import M from 'materialize-css'
import '../../src/App.css'

const Navbar=()=>
{

    const {state,dispatch}=useContext(UserContext)
    const history= useHistory()
    const renderList=()=>
    {
        if(state)
        {
                return[
                    <li><Link to="/profile">Profile</Link></li>,
                    <li><Link to="/create"><i class="material-icons">add_a_photo</i></Link></li>,
                    <l1>
                        <button className="btn waves-effect waves-light" 
                        onClick={()=>{
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            history.push("/login")
                        }}>
                            Logout
                        </button>
                    </l1>
                ]
        }
        else{
            return[
                <li><Link to="/login">Signin</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return(
        <nav>
            <div className="nav-wrapper white">
                <Link to={state?"/":"/login" } className="brand-logo left">Social Shout</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar