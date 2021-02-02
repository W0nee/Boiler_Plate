import { combineReducers } from "redux";
import user from "./user_reducer";
// import comment from "./comment_reducer";

//여러가지 reducer들을 합쳐주기 위해 필요한 것
const rootReducer = combineReducers({
  user,
});

export default rootReducer;

// reducer는 state가 어떻게 변하는지 보여준다음에 변합 마지막 값을 return
