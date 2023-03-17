import { initState } from "./initState";
import { rootReducer } from './redux/rootReducer';
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const store = createStore(
rootReducer,
initState,
composeWithDevTools(
applyMiddleware(thunk)
)
);
