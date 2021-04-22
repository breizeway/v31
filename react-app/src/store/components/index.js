import { combineReducers} from 'redux';


import modalReducer from './modal';
import dropDownReducer from './dropDown';
import listReducer from './list';
import calendarReducer from './calendar';
import pickReducer from './pick';
import userReducer from './user';


const componentReducer = combineReducers({
    Modal: modalReducer,
    DropDown: dropDownReducer,
    List: listReducer,
    Calendar: calendarReducer,
    Pick: pickReducer,
    User: userReducer,
});

export default componentReducer
