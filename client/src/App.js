import React,{Fragment,useEffect} from 'react';
import './App.css';
// fragment is like a ghost element wont show in browser
import { BrowserRouter as Router,Route ,Switch,  } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";
import setAuthToken from "./utils/setAuthToken";

// Redux 
import { Provider } from "react-redux";  //connects react redux
import store from "./store";
import { loadUser } from "./actions/auth";
import { createStore } from 'redux';


if(localStorage.token){
  setAuthToken(localStorage.token)
}


const  App = () =>{
  // Life cycle method just like component did mount
  useEffect(()=>{
      store.dispatch(loadUser())
  },[])  //[] for so it only runs once
  return(

  <Provider store={store}>
      <Router>
        <Fragment>
            <Navbar/>
            <Switch>
            <Route exact path="/" component={Landing}/>
            <Route component={Routes}/>
            </Switch>
            
           
        </Fragment>
      </Router>
      </Provider>
)}


export default App;
