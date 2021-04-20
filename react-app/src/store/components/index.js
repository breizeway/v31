import { combineReducers} from 'redux';


import modalReducer from './modal';
import dropDownReducer from './dropDown';
import listReducer from './list';
import calendarReducer from './calendar';
import pickReducer from './pick';


const componentReducer = combineReducers({
    Modal: modalReducer,
    DropDown: dropDownReducer,
    List: listReducer,
    Calendar: calendarReducer,
    Pick: pickReducer,
});

export default componentReducer
