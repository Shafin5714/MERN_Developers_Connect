// rfcf

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert=>(
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>

))

Alert.propTypes = {
    // p t a r
 alerts:PropTypes.array.isRequired
}
const mapStateToProps = state =>({
    // form root reducer
    alerts: state.alert   ///alert is from root reducer
})
// mapStateToProps so not null first one
export default connect(mapStateToProps)(Alert)
