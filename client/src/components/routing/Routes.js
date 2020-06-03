import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-from/CreateProfile";
import EditProfile from "../profile-from/EditProfile";
import AddExperience from "../profile-from/AddExperience";
import PrivateRoute from "../routing/PrivateRoute";
import NotFound from "../layout/NotFound";
import AddEducation from "../profile-from/AddEducation";
import Profile from "../profile/Profile";
// Profiles
import Profiles from "../profiles/Profiles";
// Post
import Posts from "../posts/Posts";
import Post from "../post/Post";

const Routes = props => {
    return (
        <section className="container">
              <Alert/>
              <Switch>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/profiles" component={Profiles}/>
              <Route exact path="/profile/:id" component={Profile}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
              <PrivateRoute exact path="/add-experience" component={AddExperience}/>
              <PrivateRoute exact path="/add-education" component={AddEducation}/>
              <PrivateRoute exact path="/posts" component={Posts}/>
              <PrivateRoute exact path="/posts/:id" component={Post}/>
              <Route component={NotFound} />
              </Switch>
            </section>
    )
}

Routes.propTypes = {

}

export default Routes
