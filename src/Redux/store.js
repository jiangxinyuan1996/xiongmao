import { createStore,combineReducers } from 'redux' 
import tabbarReducer from './Reducers/tabbarReducer'

const reducer = combineReducers({
    tabbarReducer
})

const store = createStore(reducer)
export default store 