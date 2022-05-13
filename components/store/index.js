import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import user from "./user";
import trip from "./trip";
import places from "./places";
import memories from "./memories";

const rootReducer = combineReducers({
  user,
  trip,
  places,
  memories,
});

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);

// export default rootReducer
export default store;
export * from "./user";
