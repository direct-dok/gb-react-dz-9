import isAuthProfileAction from '../../store/actionCreators/is_auth_profile_action'
import firebase from 'firebase'

export const checkAuthThunk = () => {

    return (dispatch) => {

        firebase.auth().onAuthStateChanged((user) => {

              if(user) {
                dispatch(isAuthProfileAction(true))
              } else {
                  dispatch(isAuthProfileAction(false))
              }

        })

    }
}