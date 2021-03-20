const ADD_SERVER = "server/addServer";

const addServer = (newServer) => ({
  type: ADD_SERVER,
  newServer,
});

//add a server
export const createServer = (serverFormInput) => async (dispatch) => {
  const { admin_id, name, description, isPublic, image } = serverFormInput;
  const response = await fetch(`/api/servers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ admin_id, name, description, isPublic, image }),
  });
  //   console.log()
  //   console.log(typeof response);
  //   console.log(await response.json());
  //   const data = await response.json();
  //   console.log(data);
  //   dispatch(addServer());
};
