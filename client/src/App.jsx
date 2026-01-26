import { useEffect } from "react";
import { io } from "socket.io-client";
import Chat from "./pages/Chat";

const socket = io("http://localhost:5000");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <Chat socket={socket} />;
}

export default App;
