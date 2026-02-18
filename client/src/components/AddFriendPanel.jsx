import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function AddFriendPanel() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load logged in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-user"));
    setCurrentUser(user);
  }, []);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const allUsers = snapshot.docs.map((doc) => doc.data());

      setUsers(
        allUsers.filter((user) => user.uid !== currentUser?.uid)
      );
    };

    if (currentUser) fetchUsers();
  }, [currentUser]);

  // Send Friend Request
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
    <div className="p-4 text-white">
      <h2 className="text-lg font-semibold mb-4">Add Friends</h2>

      {users.map((user) => (
        <div
          key={user.uid}
          className="flex justify-between items-center bg-slate-800 p-3 rounded-lg mb-2"
        >
          <span>{user.email}</span>

          <button
            onClick={() => sendFriendRequest(user.uid)}
            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
          >
            Add Friend
          </button>
        </div>
      ))}
    </div>
  );
}

export default AddFriendPanel;
