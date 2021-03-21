const ADD_SERVER = 'server/addServer';
const FIND_SERVER = 'server/findServer';

const addServer = (newServer) => ({
    type: ADD_SERVER,
    newServer,
});

const findServer = (server) => ({
    type: FIND_SERVER,
    server,
});

//add a server
export const createServer = (serverFormInput) => async (dispatch) => {
    const { admin_id, name, description, isPublic, image } = serverFormInput;
    const response = await fetch(`/api/servers/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admin_id, name, description, isPublic, image }),
    });
    const data = await response.json();
    dispatch(addServer(data));
    return data;
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

// Grabs all the servers that the logged in user has joined from the database

const initialState = {};
const serverReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SERVER:
            return action.newServer;
        case FIND_SERVER:
            return action.server;
        default:
            return state;
    }
};

export default serverReducer;
