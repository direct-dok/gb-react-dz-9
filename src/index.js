import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import { Provider } from 'react-redux'
import { store } from './store/store'
import './services/config'

ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
      , 
      document.getElementById('root')
)

// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './components/App'

// import { Provider } from 'react-redux'
// import { persistor, store } from './store/store'
// import { PersistGate } from 'redux-persist/integration/react'


// ReactDOM.render(
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <App />
//         </PersistGate>
//       </Provider>
//       , 
//       document.getElementById('root')
// )