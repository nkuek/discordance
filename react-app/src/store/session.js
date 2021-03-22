const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// signup
export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// login
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// logout
export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

// authenticate
export const restoreUser = () => async (dispatch) => {
  const response = await fetch("/api/auth");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
