const FIND_USER_SERVERS = 'server/findUserServers';
const REMOVE_USER_SERVERS = 'server/removeUserServers';

const findUserServers = (userServers) => ({
    type: FIND_USER_SERVERS,
    userServers,
});

const removeUserServers = () => ({
    type: REMOVE_USER_SERVERS,
});

export const fetchUserServers = (userId) => async (dispatch) => {
    if (!userId) return;
    const response = await fetch('/api/users/servers/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userId),
    });
    const userServers = await response.json();
    return dispatch(findUserServers(userServers));
};

export const resetUserServers = () => async (dispatch) => {
    dispatch(removeUserServers());
};

export const joinServer = (serverId, userId) => async (dispatch) => {
    const response = await fetch('/api/users/servers/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serverId, userId }),
    });
    const userServers = await response.json();
    return dispatch(findUserServers(userServers));
};

const userInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case FIND_USER_SERVERS:
            return action.userServers;
        case REMOVE_USER_SERVERS:
            state = {};
            return state;
        default:
            return state;
    }
};

export default userInfoReducer;
