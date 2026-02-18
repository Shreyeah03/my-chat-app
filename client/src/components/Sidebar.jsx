import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Search, Settings, Bot } from "lucide-react";
 
function Sidebar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const { selectedChat, setSelectedChat } = useContext(ChatContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-user"));
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUsers = querySnapshot.docs.map(doc => doc.data());

      setUsers(allUsers.filter(user => user.uid !== currentUser?.uid));
    };

    if (currentUser) fetchUsers();
  }, [currentUser]);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const getAvatar = avatar => {
    if (!avatar)
      return "https://api.dicebear.com/7.x/bottts/svg?seed=default";

    return avatar.replace(".glb", ".png");
  };
  const sendFriendRequest = async (receiverId) => {
  try {
    await addDoc(collection(db, "friendRequests"), {
      senderId: currentUser.uid,
      receiverId: receiverId,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    alert("Friend request sent!");
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="flex flex-col h-screen w-[320px] bg-gradient-to-b from-[#020617] to-[#020617] border-r border-slate-800 text-white">

      {/* ===== PROFILE HEADER ===== */}
      {currentUser && (
        <div className="flex items-center gap-3 p-4 border-b border-slate-800 backdrop-blur-lg bg-white/5">
          
          <div className="relative">
            <img
              src={getAvatar(currentUser.avatarImage)}
              className="w-12 h-12 rounded-full ring-2 ring-indigo-500/40"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#020617] rounded-full"></span>
          </div>

          <div>
            <h2 className="font-semibold text-sm tracking-wide">
              {currentUser.email.split("@")[0]}
            </h2>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </div>
      )}

      {/* ===== SEARCH ===== */}
      <div className="p-4">
        <div className="flex items-center bg-slate-900/70 focus-within:ring-2 ring-indigo-500/50 transition rounded-xl px-3 py-2">
          <Search size={16} className="text-slate-400" />
          <input
            placeholder="Search or start chat..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none ml-2 text-sm w-full placeholder-slate-500"
          />
        </div>
      </div>

      {/* ===== USERS LIST ===== */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1 custom-scroll">

        {filteredUsers.map(user => (
          <div
            key={user.uid}
            onClick={() => setSelectedChat(user)}
            className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300

            ${
              selectedChat?.uid === user.uid
                ? "bg-indigo-600/20 border border-indigo-500/30"
                : "hover:bg-slate-800/60"
            }
            `}
          >
            <div className="relative">
              <img
                src={getAvatar(user.avatarImage)}
                className="w-11 h-11 rounded-full"
              />

              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#020617] rounded-full"></span>
            </div>

            <div className="flex flex-col">
              <h3 className="text-sm font-medium tracking-wide group-hover:text-indigo-400 transition">
                {user.email.split("@")[0]}
              </h3>

              <p className="text-xs text-slate-400">
                Tap to chat
              </p>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); sendFriendRequest(user.uid); }}
              className="ml-auto bg-blue-500 text-xs px-3 py-1 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        ))}
      </div>


      {/* ===== FOOTER ===== */}
      <div className="border-t border-slate-800 p-3 flex justify-around">

        <button className="p-2 rounded-lg hover:bg-slate-800 transition">
          <Bot size={20} />
        </button>

        <button className="p-2 rounded-lg hover:bg-slate-800 transition">
          <Settings size={20} />
        </button>

      </div>

    </div>
  );
}

export default Sidebar;
