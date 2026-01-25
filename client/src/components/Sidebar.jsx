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
    lastMessage: "Let’s build this "
  }
];

export default function Sidebar() {
  return (
    <div className="w-1/4 bg-[#1f2937] text-white flex flex-col">
      {/* Profile */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-700">
        <img
          src="https://i.pravatar.cc/40?img=8"
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold">You</span>
      </div>

      {/* Search */}
      <div className="p-3">
        <input
          placeholder="Search"
          className="w-full px-3 py-2 rounded bg-gray-800 text-sm outline-none"
        />
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex gap-3 p-3 hover:bg-gray-700 cursor-pointer"
          >
            <img
              src={chat.avatar}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{chat.name}</p>
              <p className="text-sm text-gray-400 truncate">
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
