<div className="bg-red-500 text-white p-5 text-2xl">
  Tailwind Test Working 🚀
</div>


import AddFriendPanel from "../components/AddFriendPanel";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatUI from "../components/ChatUI";
<AddFriendPanel />




const socket = io("http://localhost:5000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send-message", message);
    setMessage("");
  };

  return (
    <div>
      <ChatUI
        message={message}
        setMessage={setMessage}
        messages={messages}
        sendMessage={sendMessage}
      />
      <div>
        <h1 style={{ color: "white" }}>TEST PANEL</h1>
        <AddFriendPanel />
      </div>
    </div>
  );
}
