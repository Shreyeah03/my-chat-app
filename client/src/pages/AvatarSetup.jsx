import { AvatarCreator } from "@readyplayerme/react-avatar-creator";

export default function AvatarSetup({ onAvatarSelected }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <AvatarCreator
        subdomain="demo"
        config={{ clearCache: true }}
        style={{ width: "600px", height: "700px" }}
        onAvatarExported={(event) => {
          const avatarUrl = event.data.url;
          onAvatarSelected(avatarUrl);
        }}
      />
    </div>
  );
}
