const DELETE_MESSAGE = "message/deleteMessage";

const deleteMessage = () => ({
  type: DELETE_MESSAGE,
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
  console.log(messageId);
  dispatch(deleteMessage());
};

const initialState = {};
const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MESSAGE:
      state = {};
      return state;
    default:
      return state;
  }
};

export default messageReducer;
