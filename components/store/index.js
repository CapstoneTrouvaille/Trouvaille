import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import user from "./user";
import trip from "./trip";
import places from "./places";
import memories from "./memories";
import food from "./food";
import savedItems from "./saved";

const rootReducer = combineReducers({
  user,
  trip,
  places,
  memories,
  food,
  savedItems
});

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);

// export default rootReducer
export default store;
export * from "./user";
