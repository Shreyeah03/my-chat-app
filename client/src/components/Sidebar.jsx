import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // your firebase config
import { Search } from "lucide-react";

function Sidebar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const { selectedChat, setSelectedChat } = useContext(ChatContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-user"));
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUsers = querySnapshot.docs.map(doc => doc.data());

      setUsers(
        allUsers.filter(user => user.uid !== currentUser?.uid)
      );
    };

    if (currentUser) fetchUsers();
  }, [currentUser]);

  const getAvatar = (avatar) => {
    if (!avatar)
      return "https://api.dicebear.com/7.x/bottts/svg?seed=default";

    return avatar.replace(".glb", ".png");
  };

  return (
    <div className="flex flex-col h-screen w-[300px] bg-[#020617] text-white border-r border-gray-800">

      {/* PROFILE */}
      {currentUser && (
        <div className="flex items-center gap-3 p-4 border-b border-gray-800">
          <img
            src={getAvatar(currentUser.avatarImage)}
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h2 className="font-semibold text-sm">
              {currentUser.email.split("@")[0]}
            </h2>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </div>
      )}

      {/* SEARCH */}
      <div className="p-4">
        <div className="flex items-center bg-[#0f172a] rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search users..."
            className="bg-transparent outline-none ml-2 text-sm w-full"
          />
        </div>
      </div>

      {/* USERS LIST */}
      <div className="flex-1 overflow-y-auto px-2">

        {users.map(user => (
          <div
            key={user.uid}
            onClick={() => setSelectedChat(user)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
            ${selectedChat?.uid === user.uid ? "bg-[#1e293b]" : "hover:bg-[#0f172a]"}`}
          >
            <img
              src={getAvatar(user.avatarImage)}
              className="w-10 h-10 rounded-full"
            />

            <div>
              <h3 className="text-sm font-medium">
                {user.email.split("@")[0]}
              </h3>
              <p className="text-xs text-gray-400">
                Click to chat
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Sidebar;
