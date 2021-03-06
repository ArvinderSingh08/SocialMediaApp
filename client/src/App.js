import React,{useEffect,createContext, useReducer,useContext} from 'react';
import "./App.css";
import {BrowserRouter, Route, Switch,useHistory} from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Navbar from './components/Navbar';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState} from './reducers/userReducer';
import UserProfile from './components/screens/UserProfile'

export const UserContext=createContext()

const Routing=()=>
{
  const history= useHistory()
  const {state,dispatch}= useContext(UserContext) 
  console.log(state)
  useEffect(()=>
  {
    const user= JSON.parse(localStorage.getItem("user"))
    if(user)
    {
      dispatch({type:"USER", payload:"user"})
      history.push('/')
    }
    else{
      history.push('/login')
    }
  },[])
  return(
    <Switch>
        <Route exact path="/">  <Home/> </Route>
        <Route path="/login"> <Login/> </Route>
        <Route path="/signup">  <Signup/> </Route>
        <Route exact path="/profile"> <Profile/>  </Route>
        <Route path="/create"> <CreatePost/>  </Route>
        <Route path="/profile/:userid"> <UserProfile/>  </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch]= useReducer(reducer,initialState)
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>

    </>
  )
}

export default App;
