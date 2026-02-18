import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import ChatUI from "../components/ChatUI";
import AddFriendPanel from "../components/AddFriendPanel";
import { ChatContext } from "../context/ChatContext";
import { Plus, MessageSquare, Users, Settings, LogOut, ChevronDown, Hash, Volume2, Phone, Search } from "lucide-react";

const socket = io("http://localhost:5000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { currentRoom, createRoom, joinRoom, rooms, addMessageToRoom } = useContext(ChatContext);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      if (currentRoom) {
        addMessageToRoom(currentRoom.id, msg);
      }
    });

    return () => {
      socket.off("receive-message");
    };
  }, [currentRoom, addMessageToRoom]);

  const sendMessage = () => {
    if (!message.trim()) return;
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
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Left Sidebar - Servers */}
      <div className="w-20 bg-gray-950 border-r border-gray-800 flex flex-col items-center py-3 gap-3 shadow-xl">
        {/* Logo */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg hover:rounded-2xl transition-all cursor-pointer">
          C
        </div>

        <div className="w-10 h-10 bg-gray-700 rounded-full hover:bg-blue-500 transition flex items-center justify-center cursor-pointer" title="Add server">
          <Plus size={20} />
        </div>

        <div className="flex-1" />

        <button className="w-10 h-10 bg-gray-700 rounded-full hover:bg-gray-600 transition flex items-center justify-center" title="Settings">
          <Settings size={20} />
        </button>

        <button className="w-10 h-10 bg-gray-700 rounded-full hover:bg-red-600 transition flex items-center justify-center" title="Logout">
          <LogOut size={20} />
        </button>
      </div>

      {/* Main Sidebar - Channels & Friends */}
      <div className="w-72 bg-gray-800 border-r border-gray-700 flex flex-col shadow-lg">
        {/* Server Header */}
        <div className="h-14 bg-gray-700 border-b border-gray-600 px-4 flex items-center justify-between hover:bg-gray-650 transition cursor-pointer">
          <h1 className="font-bold text-white">Chat Server</h1>
          <ChevronDown size={20} className="text-gray-400" />
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto">
          {/* Online Friends - Quick Access */}
          <div className="px-2 pt-4 pb-2">
            <p className="text-xs font-bold text-gray-400 uppercase px-2 mb-2">Channels</p>
            {rooms.length === 0 ? (
              <p className="text-xs text-gray-500 px-3 py-2 text-center">No rooms yet</p>
            ) : (
              rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => handleJoinRoom(room)}
                  className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition flex items-center gap-2 ${
                    currentRoom?.id === room.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <Hash size={16} />
                  <span className="text-sm">{room.name}</span>
                  <span className="text-xs ml-auto bg-gray-600 px-1.5 py-0.5 rounded">
                    {room.messages?.length || 0}
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Create Channel Form */}
          {showCreateRoom && (
            <div className="px-3 py-3 border-t border-gray-700 bg-gray-700/30">
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCreateRoom()}
                placeholder="Channel name..."
                className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white text-sm outline-none focus:ring-2 ring-blue-500 mb-2 placeholder-gray-500"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateRoom}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-sm font-semibold transition"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreateRoom(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-sm font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Friends Section */}
          <div className="px-2 pt-4 pb-2 border-t border-gray-700 mt-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <p className="text-xs font-bold text-gray-400 uppercase">Friends</p>
              <button 
                onClick={() => setShowCreateRoom(true)}
                className="text-gray-400 hover:text-white hover:bg-gray-700 p-1 rounded transition"
                title="Add channel"
              >
                <Plus size={14} />
              </button>
            </div>
            <AddFriendPanel />
          </div>
        </div>

        {/* User Profile */}
        <div className="h-14 bg-gray-700 border-t border-gray-600 px-4 flex items-center justify-between hover:bg-gray-650 transition cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
              U
            </div>
            <p className="text-sm font-semibold">You</p>
          </div>
          <Settings size={18} className="text-gray-400 hover:text-white" />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentRoom ? (
          <>
            {/* Channel Header */}
            <div className="h-14 bg-gray-800 border-b border-gray-700 px-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <Hash size={20} className="text-gray-400" />
                <div>
                  <h2 className="font-bold">{currentRoom.name}</h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-700 rounded transition" title="Search">
                  <Search size={18} />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded transition" title="Voice call">
                  <Phone size={18} />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded transition" title="Members">
                  <Users size={18} />
                </button>
              </div>
            </div>

            <ChatUI
              message={message}
              setMessage={setMessage}
              messages={messages}
              sendMessage={sendMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MessageSquare size={64} strokeWidth={1} className="mb-4 opacity-20" />
            <p className="text-xl font-semibold mb-2">No channel selected</p>
            <p className="text-sm">Select a channel to start chatting or create a new one</p>
            <button
              onClick={() => setShowCreateRoom(true)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition"
            >
              Create Channel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
