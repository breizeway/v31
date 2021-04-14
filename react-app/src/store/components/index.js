import { combineReducers} from 'redux';


import calendarReducer from './calendar';
import dropDownReducer from './DropDown';


const componentReducer = combineReducers({
    Calendar: calendarReducer,
    DropDown: dropDownReducer,
});

export default componentReducer
