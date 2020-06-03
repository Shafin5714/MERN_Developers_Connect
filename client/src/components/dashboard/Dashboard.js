// r a c f p
import React,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from 'react-router-dom';
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
// get current profile as soon as this loads
// use useEffect

// auth:{user},profile:{profile,loading} de-structuring
const Dashboard = ({getCurrentProfile,deleteAccount,auth:{user},profile:{profile,loading}}) => {
    useEffect(()=>{
      getCurrentProfile() 
    },[getCurrentProfile])  ///[] for run only once
    return loading && profile == null ? <Spinner/> :<Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        {/* if user exists show username */}
        <p className='lead'>
            <i className="fas fa-user"> Welcome {user && user.name}</i>
        </p>
        { profile !== null ? <Fragment>
            <DashboardActions/>
            {/* passing  experience */}
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            <div className="my-2">
                <button className="btn btn-danger" onClick={()=>deleteAccount()}>
                    <i className="fas fa-user-minus"></i>Delete My Account
                </button>
            </div>
        </Fragment> : <Fragment>
            <p>You have not yet setup a profile,please add some info</p>
            <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
            </Fragment>}
    </Fragment>     
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,   
    auth: PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth:state.auth,
    profile: state.profile
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard)
