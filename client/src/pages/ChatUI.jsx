export default function ChatUI({
  message,
  setMessage,
  messages,
  sendMessage,
}) {
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r p-4">
        <h2 className="font-semibold text-lg">Chats</h2>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-white font-semibold">
          Chat
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className="max-w-xs px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {m}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Type a message"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
