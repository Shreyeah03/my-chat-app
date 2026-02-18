import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Send, Smile, MessageSquareText } from "lucide-react";

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
    <div className="flex flex-col h-full bg-gray-900">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MessageSquareText size={48} strokeWidth={1} className="mb-4 opacity-20" />
            <p className="text-lg">No messages yet</p>
            <p className="text-sm">Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="flex justify-start">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg shadow-md max-w-sm md:max-w-md break-words">
                <p className="text-base">{msg}</p>
                <p className="text-xs text-blue-100 mt-1 opacity-70">now</p>
              </div>
            </div>
          ))
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
          />
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-700 bg-gray-800 p-4">
        <div className="flex gap-2">
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
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 ring-blue-500 transition placeholder-gray-400"
          />
          
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="px-4 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg transition flex items-center justify-center text-yellow-400 hover:text-yellow-300"
            title="Add emoji"
          >
            <Smile size={22} />
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={!message.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition flex items-center gap-2 font-semibold text-white"
          >
            <Send size={20} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
