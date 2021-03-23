const ADD_CHANNEL = "channel/addChannel";

const addChannel = (newChannel) => ({
  type: ADD_CHANNEL,
  newChannel,
});

//add a channel
export const createChannel = (name, serverId) => async (dispatch) => {
  const response = await fetch("/api/servers/:id/:channel_id/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

const initialState = {};
const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANNEL:
      return action.newChannel;
    default:
      return state;
  }
};

export default channelReducer;
