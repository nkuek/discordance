import React, { useState } from "react";
import "./Chat.css";
function Counter({ authenticated, setAuthenticated }) {
  // Set the initial count state to zero, 0
  const [count, setCount] = useState(0);

  // Create handleIncrement event handler
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const [status, setStatus] = useState(false);

  function changeStatus() {
    setStatus(true);
  }

  //Create handleDecrement event handler
  const handleDecrement = () => {
    setCount((prevCount) => {
      if (prevCount !== 0) {
        return prevCount - 1;
      }
    });
  };
  return (
    <div>
      <div>
        {/* <button onClick={handleDecrement}>-</button> */}
        <h5>{count}</h5>
        <button id="heart-like__btn" onClick={handleIncrement}>
          ❤️
        </button>
      </div>
      {/* <button onClick={() => setCount(0)}>Reset</button> */}
    </div>
  );
}

export default Counter;
