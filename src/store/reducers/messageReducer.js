import defaultState from '../initialState'
import ADD_MESSAGE from '../actions/action_add_message'
import ADD_CHAT_MESSAGES from '../actions/action_add_chat_messages'
import REMOVE_CHAT_MESSAGES from '../actions/action_remove_chat_messages'
import SET_STATE_MESSAGES from '../actions/action_set_state_message'


const messageReducer = (state = defaultState, action) => {
    switch (action.type) {
      case ADD_MESSAGE:
        return {...state, chatMessages: {...state.chatMessages, [action.payload.id]: {...action.payload.obj}} }
      case ADD_CHAT_MESSAGES:
        return {...state, chatMessages: {...state.chatMessages, [action.payload] : {} }}
      case REMOVE_CHAT_MESSAGES:
        return {...state, chatMessages: action.payload}
      case SET_STATE_MESSAGES:
        return {...state, chatMessages: {...action.payload}}
      default: 
        return state
    }
}

export {messageReducer}