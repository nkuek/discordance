const ADD_SERVER = "server/addServer";

const addServer = (newServer) => ({
  type: ADD_SERVER,
  newServer,
});

//add a server
export const createServer = (serverFormInput) => async (dispatch) => {
  const { admin_id, name, description, isPublic, image } = serverFormInput;
  const response = await fetch(`/api/servers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ admin_id, name, description, isPublic, image }),
  });
  const data = await response.json();
  dispatch(addServer(data));
  return data;
};

const initialState = {};
const serverReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SERVER:
      return action.newServer;
    default:
      return state;
  }
};

export default serverReducer;
