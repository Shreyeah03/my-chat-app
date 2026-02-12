export default function Chat() {
  return (
    <div className="flex-1 h-full">
      <ChatUI
        message={message}
        setMessage={setMessage}
        messages={messages}
        sendMessage={sendMessage}
      />
    </div>
  );
}
