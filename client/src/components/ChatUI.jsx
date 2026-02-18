import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Send, Smile } from "lucide-react";

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

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400">
            <p>No messages yet. Start typing!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 w-fit px-4 py-2 rounded-lg max-w-xs break-words"
            >
              {msg}
            </div>
          ))
        )}
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="border-t border-slate-700 bg-slate-900 p-2 max-h-72 overflow-y-auto">
          <EmojiPicker 
            onEmojiClick={onEmojiClick} 
            theme="dark"
            height={250}
            width="100%"
          />
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-slate-700 bg-slate-900 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type message..."
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-slate-400"
          />
          
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition flex items-center justify-center"
            title="Add emoji"
          >
            <Smile size={20} />
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={!message.trim()}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition flex items-center gap-2 font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
