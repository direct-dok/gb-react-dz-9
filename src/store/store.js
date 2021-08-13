import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers/rootReducer'

export const store = createStore(rootReducer, applyMiddleware(thunk))

// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// import rootReducer from './reducers/rootReducer'

// const persistConfig = {
//     key: 'chatState', 
//     storage: storage, 
//     blacklist: ['chats'] 
// }

// const pReducer = persistReducer(persistConfig, rootReducer)
// const middleware = applyMiddleware(thunk)
// const store = createStore(pReducer, middleware)
// const persistor = persistStore(store)

// export { persistor, store }