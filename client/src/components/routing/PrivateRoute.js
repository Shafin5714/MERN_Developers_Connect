import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import { Route,Redirect } from "react-router-dom";

// ...rest that will take anything else thats passed in
const PrivateRoute = ({component : Component,auth : {isAuthenticated,loading},...rest}) =>(
    <Route {...rest} render={props=>!isAuthenticated && !loading ? (<Redirect to='/login'/>) : (<Component {...props }/>)}/>   ///auth.isAuthenticated
)

PrivateRoute.propTypes = {
    auth:PropTypes.object.isRequired,
}

const mapStateToProps =state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
