const ADD_SERVER = 'server/addServer';

const addServer = () => ({
    type: ADD_SERVER,
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
    // dispatch(addServer());
};
