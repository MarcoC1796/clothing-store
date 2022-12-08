import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";

// root-reducer: combination of all of our reducers
export const rootReducer = combineReducers({
  user: userReducer,
});
