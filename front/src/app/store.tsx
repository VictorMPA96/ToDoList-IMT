import { configureStore, applyMiddleware, compose, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const store = configureStore({
    reducer: rootReducer,
    middleware:  [thunk]
});

export default store;
export type RootState = ReturnType<typeof store.getState>;