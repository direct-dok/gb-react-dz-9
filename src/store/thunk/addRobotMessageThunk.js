import addNewMessage from '../actionCreators/add_message_action'

export const addRobotMessageThunkCreator = (objPayload) => {

    return (dispatch) => {
        setTimeout(
            () => dispatch(addNewMessage(objPayload)), // Сюда должен прийти уже измененный стейт с сообщением от робота
            2000
        )
    }
    
}