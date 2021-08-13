import defaultState from '../initialState'
import ADD_NEWS from '../actions/action_add_news'
import REMOVE_NEWS from '../actions/action_remove_news'
import ERROR_ADD_NEWS from '../actions/error_add_news_action'
import NOTE_ERROR_ADD_NEWS from '../actions/not_error_add_news_action'

const newsReducer = (state = defaultState, action) => {
    switch (action.type) {
      case ADD_NEWS:
        return {...state, news: [...state.news,  ...action.payload]}
      case REMOVE_NEWS: 
        return {...state, news: []}
      case ERROR_ADD_NEWS: 
        return {...state, newsAddError: true}
      case NOTE_ERROR_ADD_NEWS: 
        return {...state, newsAddError: false}
      default: 
        return state
    }
}

export {newsReducer}