const ADD_SERVER = 'server/addServer';
const FIND_SERVER = 'server/findServer';
const DELETE_SERVER = 'server/deleteServer';
const EDIT_SERVER = 'server/editServer';
const CLEAR_SERVER = 'server/clearServer';

const addServer = (newServer) => ({
    type: ADD_SERVER,
    newServer,
});

const findServer = (server) => ({
    type: FIND_SERVER,
    server,
});

const deleteServer = () => ({
    type: DELETE_SERVER,
});

const editServer = (updatedServer) => ({
    type: EDIT_SERVER,
    updatedServer,
});

const clearServer = () => ({
    type: CLEAR_SERVER,
});
// check this out
// const SET_USER = "aws/setImg";
// const setUser = (server) => ({
//   type: SET_USER,
//   payload: server,
// });

//add a server
export const createServer = (serverFormInput) => async (dispatch) => {
    console.log(serverFormInput, 'create server');
    // const {
    //   admin_id,
    //   name,
    //   description,
    //   isPublic,
    //   image,
    //   serverCategory,
    // } = serverFormInput;

    const response = await fetch(`/api/servers/`, {
        method: 'POST',
        body: serverFormInput,
        // JSON.stringify({
        //   admin_id,
        //   name,
        //   description,
        //   isPublic,
        //   image,
        //   serverCategory,
        // }),
    });
    const data = await response.json();
    dispatch(addServer(data));
    return data;
};

export const clearServerState = () => (dispatch) => {
    dispatch(clearServer());
};

// Find existing server in database
export const findExistingServer = (serverId) => async (dispatch) => {
    const response = await fetch('/api/servers/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serverId),
    });
    const server = await response.json();
    dispatch(findServer(server));
};

// Delete existing server
export const deleteExistingServer = (serverId) => async (dispatch) => {
    await fetch('/api/servers/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serverId),
    });
    dispatch(deleteServer());
};

// Edit existing server
export const updateExistingServer = (server) => async (dispatch) => {
    console.log(server);
    const response = await fetch('/api/servers/edit/', {
        method: 'PUT',
        body: server,
    });
    const updatedServer = await response.json();
    console.log('----------------');
    dispatch(editServer(updatedServer));
};

const initialState = {};
const serverReducer = (state = initialState, action) => {
    switch (action.type) {
        // case SET_USER:
        //   return { ...state, server: action.payload };
        case ADD_SERVER:
            return action.newServer;
        case FIND_SERVER:
            return action.server;
        case CLEAR_SERVER:
            return initialState;
        case DELETE_SERVER:
            state = {};
            return state;

        case EDIT_SERVER:
            return action.updatedServer;

        default:
            return state;
    }
};

export default serverReducer;
