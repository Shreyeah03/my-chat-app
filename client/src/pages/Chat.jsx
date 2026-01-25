import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatUI from "../components/ChatUI";

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
    <ChatUI
      message={message}
      setMessage={setMessage}
      messages={messages}
      sendMessage={sendMessage}
    />
  );
}
