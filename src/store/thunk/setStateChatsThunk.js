import { setStateChats } from '../actionCreators/set_state_chats_action'
import firebase from 'firebase'

export const setStateChatsThunk = () => {

    return (dispatch) => {

        firebase.database().ref("chats").on("value", (snapshot) => {

            console.log('firebase.database().ref')
            const messages = [];
            snapshot.forEach((snap) => {
                messages.push(snap.val());
            });
            
            dispatch(setStateChats(messages))
            console.log(snapshot.key, messages);

        });

        // dispatch(isAuthProfileAction())

    }
}