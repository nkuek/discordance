const DELETE_MESSAGE = "message/deleteMessage";
const SAVE_MESSAGE = "message/saveMessage";

const deleteMessage = () => ({
  type: DELETE_MESSAGE,
});

const saveMessage = (messageId) => ({
  type: SAVE_MESSAGE,
  messageId,
});

// Delete existing message
export const deleteExistingMessage = (messageId) => async (dispatch) => {
  await fetch("/api/chat/delete/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageId),
  });
  dispatch(deleteMessage());
};

export const saveMessageToState = (messageId) => (dispatch) => {
  dispatch(saveMessage(messageId));
};

const initialState = {};
const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MESSAGE:
      state = {};
      return state;
    case SAVE_MESSAGE:
      return action.messageId;
    default:
      return state;
  }
};

export default messageReducer;
