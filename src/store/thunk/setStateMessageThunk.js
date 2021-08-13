import { setStateMessages } from '../actionCreators/set_state_messages_action'
import firebase from 'firebase'

export const setStateMessageThunk = () => {

    return (dispatch) => {

        firebase.database().ref("messages").on("value", (snapshot) => {

            const messages = {};
            let index = 1;
      
            snapshot.forEach((snap) => {
              messages[index++] = snap.val();
            });

            dispatch(setStateMessages(messages)) // Dispatch
            
            });

    }
}