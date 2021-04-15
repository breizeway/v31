import { combineReducers} from 'redux';


import calendarReducer from './calendar';
import dropDownReducer from './dropDown';
import listReducer from './list';
import modalReducer from './modal';


const componentReducer = combineReducers({
    Calendar: calendarReducer,
    DropDown: dropDownReducer,
    List: listReducer,
    Modal: modalReducer,
});

export default componentReducer
