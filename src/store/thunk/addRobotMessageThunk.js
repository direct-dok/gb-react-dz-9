import firebase from 'firebase'
import addNewMessage from '../actionCreators/add_message_action'

export const addRobotMessageThunkCreator = (payload) => {

    

    // console.log(objPayload)

    return (dispatch) => {
        setTimeout(
            () => {
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
                dispatch(addNewMessage(payload))
            }, // Сюда должен прийти уже измененный стейт с сообщением от робота
            2000
        )
    }

}