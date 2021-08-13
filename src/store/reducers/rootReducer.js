import { combineReducers } from 'redux'
import { chatsReducer } from './chatsReducer'
import { profileReducer } from './profileReducer'
import { messageReducer } from './messageReducer'
import { newsReducer } from './newsReducer'

const rootReducer = combineReducers({
    chats: chatsReducer, 
    profile: profileReducer, 
    chatMessages: messageReducer, 
    news: newsReducer
})

export default rootReducer