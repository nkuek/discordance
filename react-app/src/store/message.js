const DELETE_MESSAGE = "message/deleteMessage";
const SAVE_MESSAGE = "message/saveMessage";
const EDIT_MESSAGE = "message/editMessage";

const deleteMessage = () => ({
  type: DELETE_MESSAGE,
});

const saveMessage = (message) => ({
  type: SAVE_MESSAGE,
  message,
});

const editMessage = (updatedMessage) => ({
  type: EDIT_MESSAGE,
  updatedMessage,
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

export const saveMessageToState = (message) => (dispatch) => {
  console.log(message);
  dispatch(saveMessage(message));
};

// Edit existing message
export const updateExistingMessage = (updatedMessage) => async (dispatch) => {
  const response = await fetch("/api/chat/edit/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedMessage),
  });
  const data = await response.json();
  dispatch(editMessage);
  return data;
};

const initialState = {};
const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MESSAGE:
      state = {};
      return state;
    case EDIT_MESSAGE:
      return action.updatedMessage;
    case SAVE_MESSAGE:
      return action.message;
    default:
      return state;
  }
};

export default messageReducer;
