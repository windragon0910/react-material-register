import { LOGIN_REQUEST } from "../actionTypes";

const initialState = {
  auth: "",
};

export default function home(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      let auth = state.auth;
      auth = action.payload;
      return {
        ...state,
        auth,
      };
    }
    default:
      return state;
  }
}
