import { useEffect, useState } from "react";
import ChatUI from "../components/ChatUI";

export default function Chat({ socket }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, { text: msg, self: false }]);
    });

    return () => socket.off("receive-message");
  }, [socket]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send-message", message);

    setMessages((prev) => [
      ...prev,
      { text: message, self: true },
    ]);

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
