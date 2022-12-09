import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";

// root-reducer: combination of all of our reducers
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
