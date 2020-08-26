import {combineReducers} from 'redux';
import productClickedReducer from './productclickedreducer';
import allProductReducer from './allproductreducer';

const allReducers=combineReducers({
    allProductReducer:allProductReducer,
    productClicked:productClickedReducer
});

export default allReducers