import { addNewChat } from '../../store/actionCreators/add_chats_action'
import { addNewChatMessages } from '../../store/actionCreators/add_new_chat_messages_action'
import firebase from 'firebase'

export const addNewChatThunk = ( payload ) => {

    return (dispatch) => {

        firebase.database().ref("chats").child(payload.chatId).set(payload.obj)

        firebase.database().ref("messages").child(payload.chatId).child('m1').set(

            {
                name: payload.name,
                message: 'Hello', 
                date: new Date().getTime(), 
                sender: 'robot'
            },
            (error) => {

                if (error) {
                  // The write failed...
                } else {
                    dispatch(addNewChatMessages(payload.chatId))
                }

            }
        )

    }
}