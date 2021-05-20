import { combineReducers} from 'redux';


import modalReducer from './modal';
import dropDownReducer from './DropDown';
import listReducer from './list';
import calendarReducer from './calendar';
import pickReducer from './pick';
import userReducer from './user';
import userCardReducer from './userCard';
import viewBarReducer from './viewBar';


const componentReducer = combineReducers({
    Modal: modalReducer,
    DropDown: dropDownReducer,
    List: listReducer,
    Calendar: calendarReducer,
    Pick: pickReducer,
    User: userReducer,
    UserCard: userCardReducer,
    ViewBar: viewBarReducer,
});

export default componentReducer
