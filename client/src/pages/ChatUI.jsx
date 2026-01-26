const ChatUI = ({ message, setMessage, messages, sendMessage }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">

      {/* Sidebar — we’ll split later */}
      <div className="w-[320px] bg-gray-800 border-r border-gray-700" />

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <div className="h-16 border-b border-gray-700 px-6 flex items-center">
          Username
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[60%] px-4 py-2 rounded-lg text-sm ${
                msg.self
                  ? "ml-auto bg-purple-600"
                  : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="h-16 border-t border-gray-700 px-4 flex gap-3 items-center">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 px-4 py-2 rounded-lg outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
