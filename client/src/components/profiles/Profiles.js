// r a c f p
import React , {Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";
 //profile:{profiles,loading} means form profile we want profiles and loading 
const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
    // when page loads it should run so will use useEffect
    useEffect(()=>{
        getProfiles()
    },[getProfiles])
    return (
        <Fragment>
            {/* means if loading */}
            { loading ? <Spinner/> : <Fragment> <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Browse and connect with developers
                </p>
                <div className="profiles">
                    {/* profile.length is greater than 0 */}
                    { profiles.length>0 ? (
                        profiles.map(profile=>(
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))
                    ): <h4>No profile found</h4> }
                </div>
             </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile:state.profile

})

export default connect(mapStateToProps,{getProfiles})(Profiles)
