import { combineReducers} from 'redux';


import calendarReducer from './calendar';


const componentReducer = combineReducers({
    Calendar: calendarReducer,
});

export default componentReducer
