import React, { useState } from "react";
import { render } from "react-dom";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

const Emoji = ({setMessageInput,messageInput}) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <div>
      <Picker
        onEmojiClick={onEmojiClick}
        disableAutoFocus={true}
        skinTone={SKIN_TONE_MEDIUM_DARK}
        groupNames={{ smileys_people: "PEOPLE" }}
        native
      />
      {chosenEmoji && setMessageInput(chosenEmoji.emoji)}
    </div>
  );
};


export default Emoji;