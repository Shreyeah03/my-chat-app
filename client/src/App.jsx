import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import AvatarSetup from "./pages/AvatarSetup";
import Sidebar from "./components/Sidebar";

function ChatLayout() {
  return (
    <div className="flex h-screen bg-[#0f172a]">
      <Sidebar />
      <Chat />
    </div>
  );
}

// ✅ Protect Chat Route
function RequireAvatar({ children }) {
  const user = JSON.parse(localStorage.getItem("chat-user"));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!user.isAvatarImageSet) {
    return <Navigate to="/setup-avatar" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />

        {/* Avatar setup page */}
        <Route path="/setup-avatar" element={<AvatarSetup />} />

        {/* Chat page protected */}
        <Route
          path="/chat"
          element={
            <RequireAvatar>
              <ChatLayout />
            </RequireAvatar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
