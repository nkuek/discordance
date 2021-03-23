const FIND_PUBLIC_SERVER = 'server/findPublicServer';

const findPublicServer = (servers) => ({
    type: FIND_PUBLIC_SERVER,
    servers,
});


// find all public servers

export const findPublicServers = () => async (dispatch) => {
    const response = await fetch('/api/servers/public', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const publicServers = await response.json();
    dispatch(findPublicServer(publicServers));
};


// Grabs all the servers that the logged in user has joined from the database

const initialState = {};
const publicServerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PUBLIC_SERVER:
            return action.servers;
        default:
            return state;
    }
};

export default publicServerReducer;
