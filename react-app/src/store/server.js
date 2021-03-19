const ADD_SERVER = "server/addServer";

const addServer = () => ({
  type: ADD_SERVER,
});

//add a server
export const createServer = (serverFormInput) => async (dispatch) => {
  const { name, description, isPublic, image } = serverFormInput;
  const response = await fetch(`/api/servers`, {
    method: "POST",
    body: JSON.stringify({ name, description, isPublic, image }),
  });
  const data = await response.json();
  // dispatch(addServer())
  console.log(data);
};
