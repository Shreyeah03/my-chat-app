import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Send, Smile, Plus, Paperclip, Hash } from "lucide-react";

export default function ChatUI({
  message,
  setMessage,
  messages,
  sendMessage,
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

  const getTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const getAvatar = (username) => {
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500", "bg-pink-500"];
    const hash = username.charCodeAt(0) + username.charCodeAt(username.length - 1);
    const color = colors[hash % colors.length];
    return { color, initials: username.slice(0, 2).toUpperCase() };
  };

  const currentUser = JSON.parse(localStorage.getItem("chat-user")) || {};

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Chat Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center gap-3">
        <Hash size={20} className="text-gray-400" />
        <div>
          <h1 className="font-bold text-lg">general</h1>
          <p className="text-xs text-gray-400">Welcome to the chat</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scroll">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
              <Hash size={32} />
            </div>
            <p className="text-lg font-semibold">Welcome to the chat</p>
            <p className="text-sm">This is the start of the conversation</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const { color, initials } = getAvatar(currentUser.email || "User");
            return (
              <div key={index} className="group hover:bg-gray-800/50 px-3 py-1 rounded transition flex gap-4">
                {/* Avatar */}
                <div className={`${color} w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0 mt-1`}>
                  {initials}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-white">
                      {currentUser.email?.split("@")[0] || "User"}
                    </p>
                    <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
                      {getTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-200 break-words whitespace-pre-wrap">{msg}</p>
                </div>

                {/* Actions */}
                <div className="opacity-0 group-hover:opacity-100 transition flex gap-1">
                  <button className="hover:bg-gray-700 p-2 rounded" title="Add reaction">
                    😊
                  </button>
                  <button className="hover:bg-gray-700 p-2 rounded text-xs">⋮</button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="border-t border-gray-700 bg-gray-800 p-3 max-h-80 overflow-y-auto">
          <EmojiPicker 
            onEmojiClick={onEmojiClick} 
            theme="dark"
            height={250}
            width="100%"
            searchDisabled
          />
        </div>
      )}

      {/* Input Area */}
      <div className="bg-gray-900 px-4 py-4 border-t border-gray-700">
        <div className="flex items-end gap-2 bg-gray-800 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <button className="text-gray-400 hover:text-white p-1" title="Add file">
            <Plus size={20} />
          </button>

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
            placeholder="Message #general"
            className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
          />

          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-400 hover:text-yellow-400 p-1 transition"
            title="Add emoji"
          >
            <Smile size={20} />
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={!message.trim()}
            className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed p-1 transition"
            title="Send message"
          >
            <Send size={20} />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Press <kbd className="bg-gray-700 px-1 py-0.5 rounded text-xs">Enter</kbd> to send • <kbd className="bg-gray-700 px-1 py-0.5 rounded text-xs">Shift + Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}
