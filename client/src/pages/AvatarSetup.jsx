import { AvatarCreator } from "@readyplayerme/react-avatar-creator";
import { useNavigate } from "react-router-dom";

export default function AvatarSetup() {
  const navigate = useNavigate();

  const handleAvatarExported = (event) => {
    const avatarUrl = event.data.url;

    // 🔥 Get existing user
    const user = JSON.parse(localStorage.getItem("chat-user"));

    // 🔥 Update user with avatar
    const updatedUser = {
      ...user,
      isAvatarImageSet: true,
      avatarImage: avatarUrl,
    };

    // 🔥 Save back to localStorage
    localStorage.setItem("chat-user", JSON.stringify(updatedUser));

    // 🔥 Redirect to chat (BREAKS LOOP)
    navigate("/chat");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#0f172a]">
      <AvatarCreator
        subdomain="demo"
        config={{ clearCache: true }}
        style={{ width: "600px", height: "700px" }}
        onAvatarExported={handleAvatarExported}
      />
    </div>
  );
}
