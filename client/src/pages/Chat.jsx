import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import ChatUI from "../components/ChatUI";
import AddFriendPanel from "../components/AddFriendPanel";
import { ChatContext } from "../context/ChatContext";
import { Plus } from "lucide-react";

const socket = io("http://localhost:5000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const { currentRoom, createRoom, joinRoom, rooms, addMessageToRoom } = useContext(ChatContext);

  useEffect(() => {
    console.log("Socket connected:", socket.connected);
    
    const handleReceiveMessage = (msg) => {
      console.log("Message received from server:", msg);
      setMessages((prev) => [...prev, msg]);
      if (currentRoom) {
        addMessageToRoom(currentRoom.id, msg);
      }
    };

    socket.on("receive-message", handleReceiveMessage);

    socket.on("connect", () => {
      console.log("Socket.IO connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });

    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [currentRoom, addMessageToRoom]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    console.log("Sending message:", message);
    
    // Add message immediately to UI
    setMessages((prev) => [...prev, message]);
    if (currentRoom) {
      addMessageToRoom(currentRoom.id, message);
    }
    
    // Emit to server
    socket.emit("send-message", message);
    setMessage("");
  };

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      createRoom(roomName);
      setRoomName("");
      setShowCreateRoom(false);
      setMessages([]);
    }
  };

  const handleJoinRoom = (room) => {
    joinRoom(room.id);
    setMessages(room.messages || []);
  };

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-white">
      {/* Header with Room Selector */}
      <div className="bg-gradient-to-r from-[#1a0033] to-[#2d0052] border-b border-slate-800 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            {currentRoom ? `Room: ${currentRoom.name}` : "Chat Rooms"}
          </h1>
          {currentRoom && (
            <p className="text-xs text-slate-400">Members: {currentRoom.members.length}</p>
          )}
        </div>
        <button
          onClick={() => setShowCreateRoom(true)}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={18} /> New Room
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Rooms Sidebar */}
        <div className="w-64 bg-slate-900/50 border-r border-slate-800 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Rooms</h2>
          
          {/* Create Room Form */}
          {showCreateRoom && (
            <div className="bg-slate-800 p-3 rounded-lg mb-4 space-y-2">
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCreateRoom()}
                placeholder="Room name..."
                className="w-full px-3 py-2 bg-slate-700 rounded outline-none focus:ring-2 ring-purple-500/50 text-sm"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateRoom}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded text-sm transition"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreateRoom(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Rooms List */}
          <div className="space-y-2">
            {rooms.length === 0 ? (
              <p className="text-slate-400 text-sm">No rooms yet</p>
            ) : (
              rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => handleJoinRoom(room)}
                  className={`w-full text-left px-3 py-2 rounded transition ${
                    currentRoom?.id === room.id
                      ? "bg-purple-600"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                >
                  <p className="font-medium text-sm">{room.name}</p>
                  <p className="text-xs text-slate-400">{room.messages.length} messages</p>
                </button>
              ))
            )}
          </div>

          {/* Test Panel */}
          <div className="mt-8 pt-4 border-t border-slate-700">
            <h3 className="text-sm font-semibold mb-3">Friends</h3>
            <AddFriendPanel />
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {currentRoom ? (
            <ChatUI
              message={message}
              setMessage={setMessage}
              messages={messages}
              sendMessage={sendMessage}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Plus size={48} strokeWidth={1} className="mb-4 opacity-50" />
              <p>Select or create a room to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
