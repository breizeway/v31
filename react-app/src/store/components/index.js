import { combineReducers} from 'redux';


import calendarReducer from './calendar';
import dropDownReducer from './dropDown';
import listReducer from './list';


const componentReducer = combineReducers({
    Calendar: calendarReducer,
    DropDown: dropDownReducer,
    List: listReducer,
});

export default componentReducer
