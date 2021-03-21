const FIND_USER_SERVERS = 'server/findUserServers';

const findUserServers = (userServers) => ({
    type: FIND_USER_SERVERS,
    userServers,
});

export const fetchUserServers = (userId) => async (dispatch) => {
    const response = await fetch('/api/users/servers/', {
        method: 'PUT',
        headers: {
            ContentType: 'application/json',
        },
        body: JSON.stringify(userId),
    });
    const data = await response.json();
    console.log(data);
};
