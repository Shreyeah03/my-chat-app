import { useEffect, useState } from "react";
import { Search } from "lucide-react";

function Sidebar() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-user"));
    setCurrentUser(user);
  }, []);

  const getAvatarImage = () => {
    if (!currentUser?.avatarImage) {
      return "https://api.dicebear.com/7.x/bottts/svg?seed=default";
    }
    return currentUser.avatarImage.replace(".glb", ".png");
  };

  return (
    <div className="flex flex-col h-screen w-[300px] bg-[#020617] text-white border-r border-gray-800">

      {/* ===== Profile Section (TOP like social apps) ===== */}
      {currentUser && (
        <div className="flex items-center gap-3 p-4 border-b border-gray-800">
          <img
            src={getAvatarImage()}
            className="w-12 h-12 rounded-full object-cover"
            alt="avatar"
          />

          <div>
            <h2 className="font-semibold text-sm">
              {currentUser.email.split("@")[0]}
            </h2>
            <p className="text-xs text-gray-400">
              Online
            </p>
          </div>
        </div>
      )}

      {/* ===== Search Bar ===== */}
      <div className="p-4">
        <div className="flex items-center bg-[#0f172a] rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            className="bg-transparent outline-none ml-2 text-sm w-full"
          />
        </div>
      </div>

      {/* ===== Chat List Section ===== */}
      <div className="flex-1 overflow-y-auto px-2">
        {/* Dummy chat items (replace later with real users) */}

        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#0f172a] cursor-pointer transition">
          <img
            src="https://api.dicebear.com/7.x/bottts/svg?seed=user1"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-sm font-medium">User 1</h3>
            <p className="text-xs text-gray-400">Last message preview...</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#0f172a] cursor-pointer transition">
          <img
            src="https://api.dicebear.com/7.x/bottts/svg?seed=user2"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-sm font-medium">User 2</h3>
            <p className="text-xs text-gray-400">Last message preview...</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Sidebar;
