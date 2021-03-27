// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "./Chat.css";
// import { addMessageLike } from "../../../store/message";

// function Counter({ authenticated, setAuthenticated }) {
//   const message = useSelector((state) => state?.message);
//   const dispatch = useDispatch();

//   const [count, setCount] = useState(message.likes);
//   const [status, setStatus] = useState(false);

//   console.log(message);

//   useEffect(() => {
//     dispatch(addMessageLike(message?.id));
//   }, [count, dispatch]);

//   // Create handleIncrement event handler
//   const handleIncrement = () => {
//     setCount((prevCount) => prevCount + 1);
//   };

//   //   function changeStatus() {
//   //     setStatus(true);
//   //   }

//   //Create handleDecrement event handler
//   const handleDecrement = () => {
//     setCount((prevCount) => {
//       if (prevCount !== 0) {
//         return prevCount - 1;
//       }
//     });
//   };
//   return (
//     <div>
//       <div>
//         {/* <button onClick={handleDecrement}>-</button> */}
//         <h5>{message?.likes}</h5>
//         <a id="heart-like__btn" onClick={handleIncrement}>
//           ❤️
//         </a>
//       </div>
//       {/* <button onClick={() => setCount(0)}>Reset</button> */}
//     </div>
//   );
// }

// export default Counter;
