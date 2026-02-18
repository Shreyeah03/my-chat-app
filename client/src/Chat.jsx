import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

function Chat() {
  const { selectedChat } = useContext(ChatContext);

  if (!selectedChat)
    return (
      <div className="flex items-center justify-center w-full text-gray-400">
        Select a user to start chatting
      </div>
    );

  return (
    <div className="flex flex-col w-full">

      {/* Chat Header */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        <img
          src={selectedChat.avatarImage.replace(".glb", ".png")}
          className="w-10 h-10 rounded-full"
        />

        <h2 className="font-semibold">
          {selectedChat.email.split("@")[0]}
        </h2>
      </div>

      {/* Messages area */}
      <div className="flex-1"></div>

    </div>
  );
}

export default Chat;
