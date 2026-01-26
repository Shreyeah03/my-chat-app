import { Search, Plus } from "lucide-react";
import { useState } from "react";

const chats = [
  {
    id: 1,
    name: "Alice",
    avatar: "https://i.pravatar.cc/40?img=1",
    lastMessage: "Hey, how are you?"
  },
  {
    id: 2,
    name: "Bob",
    avatar: "https://i.pravatar.cc/40?img=2",
    lastMessage: "Let’s build this"
  }
];

export default function Sidebar() {
  const [activeChat, setActiveChat] = useState(1);

  return (
    <div className="w-[320px] bg-gray-800 text-white flex flex-col border-r border-gray-700">

      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-gray-700">
        <h2 className="font-semibold text-lg">Chats</h2>
        <Plus className="cursor-pointer hover:text-purple-400" />
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search"
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => {
          const isActive = chat.id === activeChat;

          return (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`flex gap-3 px-4 py-3 cursor-pointer transition ${
                isActive
                  ? "bg-gray-700"
                  : "hover:bg-gray-700/60"
              }`}
            >
              <img
                src={chat.avatar}
                className="w-10 h-10 rounded-full"
              />

              <div className="min-w-0">
                <p className="font-medium text-sm">{chat.name}</p>
                <p className="text-xs text-gray-400 truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
