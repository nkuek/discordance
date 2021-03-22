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
    const response = await fetch('/api/users/servers/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userId),
    });
    const userServers = await response.json();
    dispatch(findUserServers(userServers));
};

export const resetUserServers = () => async (dispatch) => {
    dispatch(removeUserServers());
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
