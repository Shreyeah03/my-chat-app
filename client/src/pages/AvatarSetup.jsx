import { AvatarCreator } from "@readyplayerme/react-avatar-creator";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AvatarSetup() {
  const navigate = useNavigate();

  // Prevent direct access without login
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-user"));

    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const handleAvatarSelected = (avatarUrl) => {
    const user = JSON.parse(localStorage.getItem("chat-user"));

    const updatedUser = {
      ...user,
      avatarImage: avatarUrl,
      isAvatarImageSet: true
    };

    localStorage.setItem("chat-user", JSON.stringify(updatedUser));

    navigate("/chat");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white">

      <h1 className="text-3xl font-semibold mb-6">
        Create Your 3D Avatar
      </h1>

      <AvatarCreator
        subdomain="demo"
        config={{ clearCache: true }}
        style={{ width: "600px", height: "700px" }}
        onAvatarExported={(event) => {
          const avatarUrl = event.data.url;
          handleAvatarSelected(avatarUrl);
        }}
      />

    </div>
  );
}
