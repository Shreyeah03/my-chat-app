export default function MessageBubble({ text, sender, avatar }) {
  const isMe = sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      {!isMe && (
        <img
          src={avatar}
          className="w-8 h-8 rounded-full mr-2 self-end"
        />
      )}

      <div
        className={`px-4 py-2 max-w-xs rounded-2xl text-sm ${
          isMe
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
