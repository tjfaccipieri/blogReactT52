import { createStore } from "redux";
import { tokenReducer } from "./tokens/tokenReducer";

const store = createStore(tokenReducer)

export default store