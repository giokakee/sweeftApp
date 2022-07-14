import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import contactsReducer from "./reducers/contactsreducer";
import historyReducer from "./reducers/historyReducer";
import userLoginedReducer from "./reducers/userloginedreducer";

const reducers = combineReducers({
	contactsReducer,
	userLogined: userLoginedReducer,
	history: historyReducer,
});

const store = configureStore(
	{
		reducer: reducers,
	},
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
