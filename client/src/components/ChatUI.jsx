export default function ChatUI({
  message,
  setMessage,
  messages,
  sendMessage,
}) {
  return (
    <div className="flex flex-col h-full text-white">
      {/* Messages */}
      <div className="flex-1 p-6 space-y-3 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-purple-600 w-fit px-4 py-2 rounded-lg"
          >
            {msg}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 flex gap-2 border-t border-gray-700">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          className="flex-1 px-4 py-2 rounded bg-gray-800 outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-purple-600 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
