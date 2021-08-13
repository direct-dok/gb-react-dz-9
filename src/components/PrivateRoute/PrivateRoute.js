import { Route, Redirect } from "react-router"
import { connect } from "react-redux"

// Selector
import { getProfile } from '../../store/selectors/getProfile'


const PrivateRoute = ({ isAuthed, ...props }) => {

    return isAuthed.isAuthed ? <Route { ...props } /> : <Redirect to="/login" />
    
}

const mapStateToProps = (store) => {
    return {
        isAuthed: getProfile(store)
    }
}

export default connect(mapStateToProps, null)(PrivateRoute)



// import { Route, Redirect } from "react-router"


// const PrivateRoute = ({ isAuthed, ...props }) => {
//     return isAuthed ? <Route { ...props } /> : <Redirect to="/login" />
// }

// export default PrivateRoute