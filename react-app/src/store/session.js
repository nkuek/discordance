
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};
// login
export const login = (id, user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await fetch(`/api/users/${id}`, {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  console.log(data);
  return response;
};

//   way to test login
// window.store.dispatch(window.sessionActions.login({
//   credential: 'Demo-lition',
//   password: 'password'
// }));

// signup
export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await fetch("/api/users", {
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

export const createUser = (user) => async (dispatch) => {
  const { images, image, username, email, password } = user;
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  // for multiple files
  if (images && images.length !== 0) {
    for (var i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
  }


// for single file
  if (image) formData.append("image", image);

  const res = await fetch(`/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();
  dispatch(setUser(data.user));
};

// logout
export const logout = () => async (dispatch) => {
  const response = await fetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const initialState = {}

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    // not sure if i have to comment this out
    // case SET_USER:
    //   newState = Object.assign({}, state);
    //   newState.user = action.payload;
    //   return newState;
    // <------>  //
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};


export const restoreUser = () => async (dispatch) => {
  const response = await fetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export default sessionReducer;