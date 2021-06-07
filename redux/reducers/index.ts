import { combineReducers } from 'redux';
import JokeReducer from './jokes';
import LoadingReducer from './loading';

const rootReducer = combineReducers({
    jokes : JokeReducer,
    loadingJoke: LoadingReducer
})

export default rootReducer;