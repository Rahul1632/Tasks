import React from "react";
import { useParams } from "react-router-dom";
import BotConversation from "./BotConversation";
import BotHeader from "./BotHeader";

const ChatBot = (props) => {
  const { token } = useParams() || "";
  const userId = localStorage.getItem("user_id");
  return (
    <div className="chat-bot">
      <BotHeader handleAlert={props?.handleAlert} />
      <BotConversation
        token={token}
        handleAlert={props?.handleAlert}
        userId={userId}
      />
    </div>
  );
};

export default ChatBot;
