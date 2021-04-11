import { combineReducers} from 'redux';


import calendarReducer from './Calendar';
import dropDownReducer from './DropDown';


const componentReducer = combineReducers({
    Calendar: calendarReducer,
    DropDown: dropDownReducer,
});

export default componentReducer
