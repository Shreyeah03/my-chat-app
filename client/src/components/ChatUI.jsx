import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Send, Smile } from "lucide-react";

export default function ChatUI({
  message,
  setMessage,
  messages,
  sendMessage,
  roomName,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessage();
      setShowEmojiPicker(false);
    }
  };

  const currentUser = JSON.parse(localStorage.getItem("chat-user")) || {};

  const getAvatar = (username) => {
    const colors = ["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-green-500 to-emerald-500", "from-yellow-500 to-orange-500", "from-red-500 to-pink-500"];
    const hash = username.charCodeAt(0) + username.charCodeAt(username.length - 1);
    return colors[hash % colors.length];
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 custom-scroll">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Smile size={40} className="text-gray-300" />
            </div>
            <p className="text-lg font-semibold mb-1">No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const username = currentUser.email?.split("@")[0] || "User";
            const avatarColors = getAvatar(username);
            return (
              <div key={index} className="flex gap-3 group">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors} flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}>
                  {username.slice(0, 1).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm">{username}</p>
                    <p className="text-xs text-gray-400">just now</p>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed break-words">{msg}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="border-t border-gray-200 bg-gray-50 p-3 max-h-80 overflow-y-auto">
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            theme="light"
            height={250}
            width="100%"
            searchDisabled
          />
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Message to ${roomName}...`}
              className="flex-1 bg-transparent text-gray-900 outline-none placeholder-gray-400 text-sm"
            />

            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-gray-500 hover:text-gray-700 transition p-1"
              title="Add emoji"
            >
              <Smile size={18} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSend}
            disabled={!message.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-lg transition flex-shrink-0"
            title="Send message"
          >
            <Send size={18} />
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          Press <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Enter</kbd> to send
        </p>
      </div>
    </div>
  );
}
