import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatUI from "../components/ChatUI";
import { ChatContext } from "../context/ChatContext";
import socket from "../socket";
import { LogOut, Plus, MessageSquare, Menu, X } from "lucide-react";

export default function Chat() {
  const navigate = useNavigate();
  const { rooms, createRoom, addMessageToRoom, currentRoom, setCurrentRoom } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showRoomsFullscreen, setShowRoomsFullscreen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("chat-user"));
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCreateRoom(false);
      }
    };

    if (showCreateRoom) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showCreateRoom]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      if (currentRoom && data.roomId === currentRoom.id) {
        setMessages((prev) => [...prev, data.message]);
        addMessageToRoom(currentRoom.id, data.message);
      }
    });

    return () => {
      socket.off("receive-message");
    };
  }, [currentRoom, addMessageToRoom]);

  useEffect(() => {
    if (currentRoom) {
      setMessages(currentRoom.messages || []);
      setRoomName(currentRoom.name);
    }
  }, [currentRoom]);

  const sendMessage = () => {
    if (message.trim() && currentRoom) {
      socket.emit("send-message", {
        message: message,
        roomId: currentRoom.id,
      });
      setMessage("");
    }
  };

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      const newRoom = createRoom(newRoomName);
      setCurrentRoom(newRoom);
      setShowCreateRoom(false);
      setNewRoomName("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("chat-user");
    navigate("/auth");
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* SIDEBAR */}
      <div
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden shadow-sm`}
      >
        {/* Header */}
        <button
          onClick={() => setShowRoomsFullscreen(true)}
          className="px-8 py-6 border-b border-gray-100 text-left hover:bg-gray-50 transition w-full"
        >
          <h1 className="text-3xl font-bold text-gray-900">Chat</h1>
          <p className="text-sm text-gray-500 mt-1">Simple messaging</p>
        </button>

        {/* Create Room Button */}
        <div className="px-6 py-4 relative" ref={dropdownRef}>
          <button
            onClick={() => setShowCreateRoom(!showCreateRoom)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
          >
            <Plus size={18} />
            New Chat
          </button>

          {/* Dropdown Menu */}
          {showCreateRoom && (
            <div className="absolute left-6 right-6 top-full mt-2 bg-white border-2 border-blue-600 rounded-xl p-4 shadow-2xl z-20">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Room Name</label>
              <input
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleCreateRoom();
                }}
                placeholder="e.g., web-dev, gaming"
                className="w-full bg-blue-50 border-2 border-blue-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-sm mb-3"
                autoFocus
              />

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowCreateRoom(false);
                    setNewRoomName("");
                  }}
                  className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRoom}
                  disabled={!newRoomName.trim()}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Rooms List */}
        <div className="flex-1 overflow-y-auto px-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 py-3 mb-2">
            Your Rooms
          </p>
          {rooms.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <MessageSquare size={32} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-400">No rooms yet</p>
              <p className="text-xs text-gray-400 mt-1">Create one to get started</p>
            </div>
          ) : (
            rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setCurrentRoom(room)}
                className={`w-full text-left px-4 py-3 rounded-lg transition text-sm font-medium mb-2 ${
                  currentRoom?.id === room.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>#{room.name}</span>
                  {room.messages?.length > 0 && (
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                      {room.messages.length}
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* User Info */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-semibold text-white text-sm">
                {currentUser?.email[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {currentUser?.email?.split("@")[0]}
                </p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 rounded-lg transition text-gray-500 hover:text-red-600 flex-shrink-0"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top Bar */}
        <div className="h-16 border-b border-gray-200 bg-white flex items-center px-6 gap-4 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 lg:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          {currentRoom ? (
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                # {roomName}
              </h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                {messages.length} messages
              </span>
            </div>
          ) : (
            <p className="text-gray-500">Select a room to start chatting</p>
          )}
        </div>

        {/* Chat Content */}
        {currentRoom ? (
          <ChatUI
            message={message}
            setMessage={setMessage}
            messages={messages}
            sendMessage={sendMessage}
            roomName={roomName}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <button
              onClick={() => setShowCreateRoom(true)}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-md"
            >
              + Start New Chat
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Rooms View */}
      {showRoomsFullscreen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Header */}
          <div className="h-16 border-b border-gray-200 bg-white flex items-center px-6 gap-4 shadow-sm">
            <button
              onClick={() => setShowRoomsFullscreen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Your Rooms</h2>
          </div>

          {/* Rooms Grid */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {rooms.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-lg text-gray-500">No rooms yet</p>
                  <p className="text-sm text-gray-400 mt-2">Create one to get started</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => {
                      setCurrentRoom(room);
                      setShowRoomsFullscreen(false);
                    }}
                    className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">#{room.name}</h3>
                      {room.messages?.length > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex-shrink-0">
                          {room.messages.length}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Click to open chat</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
