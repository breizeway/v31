import { combineReducers} from 'redux';


import modalReducer from './modal';
import dropDownReducer from './dropDown';
import listReducer from './list';
import calendarReducer from './calendar';
import pickReducer from './pick';
import userReducer from './user';
import userHeaderReducer from './userHeader';
import viewBarReducer from './viewBar';


const componentReducer = combineReducers({
    Modal: modalReducer,
    DropDown: dropDownReducer,
    List: listReducer,
    Calendar: calendarReducer,
    Pick: pickReducer,
    User: userReducer,
    UserHeader: userHeaderReducer,
    ViewBar: viewBarReducer,
});

export default componentReducer
