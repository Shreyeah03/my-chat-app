import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import ChatUI from "../components/ChatUI";
import AddFriendPanel from "../components/AddFriendPanel";
import { ChatContext } from "../context/ChatContext";
import { Plus, MessageCircle, Users } from "lucide-react";

const socket = io("http://localhost:5000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [showCreateRoom, setShowCreateRoom] = useState(false);

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
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="px-6 py-4 flex justify-between items-center border-b border-blue-700/50">
          <div className="flex items-center gap-3">
            <MessageCircle size={28} className="text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">
                {currentRoom ? currentRoom.name : "Chat Rooms"}
              </h1>
              {currentRoom && (
                <p className="text-blue-100 text-sm flex items-center gap-1">
                  <Users size={14} /> {currentRoom.members.length} members
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowCreateRoom(true)}
            className="bg-white hover:bg-blue-50 text-blue-600 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md"
          >
            <Plus size={20} /> New Room
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Rooms Sidebar */}
        <div className="w-72 bg-gray-800 border-r border-gray-700 flex flex-col overflow-hidden">
          {/* Rooms Header */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageCircle size={20} /> Rooms
            </h2>
          </div>

          {/* Create Room Form */}
          {showCreateRoom && (
            <div className="p-4 border-b border-gray-700 bg-gray-700/50">
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCreateRoom()}
                placeholder="Room name..."
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg outline-none focus:ring-2 ring-blue-500 mb-2 placeholder-gray-400"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateRoom}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreateRoom(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 px-3 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Rooms List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {rooms.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">No rooms yet. Create one!</p>
            ) : (
              rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => handleJoinRoom(room)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    currentRoom?.id === room.id
                      ? "bg-blue-600 shadow-lg"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <p className="font-semibold text-white">{room.name}</p>
                  <p className="text-xs text-gray-300 mt-1">{room.messages?.length || 0} messages</p>
                </button>
              ))
            )}
          </div>

          {/* Friends Section */}
          <div className="border-t border-gray-700 p-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Users size={16} /> Friends
            </h3>
            <AddFriendPanel />
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {currentRoom ? (
            <ChatUI
              message={message}
              setMessage={setMessage}
              messages={messages}
              sendMessage={sendMessage}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <MessageCircle size={64} strokeWidth={1} className="mb-4 opacity-30" />
              <p className="text-lg">Select or create a room to start chatting</p>
              <p className="text-sm mt-2">Click "New Room" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
