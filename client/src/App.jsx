import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/chat" element={<ChatLayout />} />
        <Route path="/setup-avatar" element={<AvatarSetup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
