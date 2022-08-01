import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(reducer)

export default store;