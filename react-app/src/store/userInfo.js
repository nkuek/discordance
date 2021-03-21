const FIND_USER_SERVERS = 'server/findUserServers';

const findUserServers = (userServers) => ({
    type: FIND_USER_SERVERS,
    userServers,
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

const userInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case FIND_USER_SERVERS:
            return action.userServers;
        default:
            return state;
    }
};

export default userInfoReducer;
