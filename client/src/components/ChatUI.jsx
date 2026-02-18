import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { Send, Smile } from "lucide-react";

export default function ChatUI({
  message,
  setMessage,
  messages,
  sendMessage,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  const onEmojiClick = (emojiObject) => {
    setMessage(message + emojiObject.emoji);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (message.trim()) {
      sendMessage();
      setShowEmojiPicker(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="flex flex-col h-full text-white">
      {/* Messages */}
      <div className="flex-1 p-6 space-y-3 overflow-y-auto custom-scroll">
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
        <div className="border-t border-slate-700 bg-slate-900 p-2 max-h-72 overflow-hidden">
          <EmojiPicker 
            onEmojiClick={onEmojiClick} 
            theme="dark"
            height={250}
            width="100%"
          />
        </div>
      )}

      {/* Input */}
      <div className="p-4 flex gap-2 border-t border-slate-700 bg-slate-900">
        <input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type message... (Enter to send)"
          className="flex-1 px-4 py-2 rounded bg-slate-800 outline-none focus:ring-2 ring-purple-500/50 text-white placeholder-slate-400"
        />
        
        <button
          onClick={toggleEmojiPicker}
          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded transition flex items-center"
          title="Add emoji"
        >
          <Smile size={20} />
        </button>

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded transition flex items-center gap-2"
        >
          <Send size={18} />
          Send
        </button>
      </div>
    </div>
  );
}
