const ADD_CHANNEL = 'channel/addChannel';
const GET_CHANNEL = 'channel/getChannel';

const addChannel = (newChannel) => ({
    type: ADD_CHANNEL,
    newChannel,
});

const getChannel = (channel) => ({
    type: GET_CHANNEL,
    channel,
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

const initialState = {};
const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHANNEL:
            return action.newChannel;
        case GET_CHANNEL:
            return action.channel;
        default:
            return state;
    }
};

export default channelReducer;
