import { useState } from "react";

function ServerForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [public, setPublic] = useState(False);
  const [image, setImage] = useState("");

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <label htmlFor="public">Public or Private</label>
          <input
            type="checkbox"
            name="public"
            value={public}
            onChange={(e) => setPublic(e.target.value)}
          ></input>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            name="image"
            placeholder="Image Url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default ServerForm;
