const ADD_CHANNEL = 'channel/addChannel';
const GET_CHANNEL = 'channel/getChannel';
const EDIT_CHANNEL = 'channel/editChannel';
const DELETE_CHANNEL = 'channel/deleteChannel';

const addChannel = (newChannel) => ({
    type: ADD_CHANNEL,
    newChannel,
});

const getChannel = (channel) => ({
    type: GET_CHANNEL,
    channel,
});

const editChannel = (updatedChannel) => ({
    type: EDIT_CHANNEL,
    updatedChannel,
});

const deleteChannel = () => ({
    type: DELETE_CHANNEL,
});

//add a channel
export const createChannel = (name, serverId) => async (dispatch) => {
    const response = await fetch('/api/servers/:id/:channel_id/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            serverId,
        }),
    });
    const data = await response.json();
    dispatch(addChannel(data));
    return data;
};

export const findExistingChannel = (channelId) => async (dispatch) => {
    const response = await fetch('/api/servers/:id/:channel_id/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(channelId),
    });
    const data = await response.json();
    dispatch(getChannel(data));
    return data;
};

export const updateExistingChannel = (updatedChannel) => async (dispatch) => {
    const response = await fetch('/api/servers/:id/:channel_id/edit/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedChannel),
    });
    const data = await response.json();
    dispatch(editChannel(data));
    return data;
};

//delete existing channel

export const deleteExistingChannel = (channelId) => async (dispatch) => {
    await fetch('/api/servers/:id/:channel_id/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(channelId),
    });
    dispatch(deleteChannel());
};

const initialState = {};
const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHANNEL:
            return action.newChannel;
        case GET_CHANNEL:
            return { ...action.channel };
        case EDIT_CHANNEL:
            return action.updatedChannel;
        case DELETE_CHANNEL:
            state = {};
            return state;
        default:
            return state;
    }
};

export default channelReducer;
