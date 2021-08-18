import firebase from 'firebase'
import addNewMessage from '../actionCreators/add_message_action'

export const addNewMessageThunk = ( payload ) => {

    return (dispatch) => {

        firebase.database().ref("messages").child(payload.id).child(payload.idMessage).set(

            payload.obj[payload.idMessage], 
            (error) => {

                if (error) {
                  // The write failed...
                } else {
                    dispatch(addNewMessage(payload))
                }

            }
        )

    }
}