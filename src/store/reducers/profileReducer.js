import defaultState from '../initialState'
import TOGGLE_ONLINE_PROFILE from '../actions/action_online_profile'
import IS_AUTH_PROFILE from '../actions/action_is_auth_profile'

const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
      case TOGGLE_ONLINE_PROFILE:
        return {...state, profile: action.payload }
      case IS_AUTH_PROFILE: 
        return {...state, profile: {...state.profile, isAuthed: action.payload}}
      default: 
        return state
    }
}

export {profileReducer}