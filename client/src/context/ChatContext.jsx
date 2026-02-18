import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  const createRoom = (roomName) => {
    const newRoom = {
      id: Date.now(),
      name: roomName,
      createdAt: new Date(),
      members: [],
      messages: [],
    };
    setRooms([...rooms, newRoom]);
    setCurrentRoom(newRoom);
    return newRoom;
  };

  const joinRoom = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setCurrentRoom(room);
    }
  };

  const addMessageToRoom = (roomId, message) => {
    setRooms(rooms.map(r => 
      r.id === roomId 
        ? { ...r, messages: [...r.messages, message] }
        : r
    ));
  };

  return (
    <ChatContext.Provider value={{ 
      selectedChat, 
      setSelectedChat,
      currentRoom,
      setCurrentRoom,
      rooms,
      setRooms,
      createRoom,
      joinRoom,
      addMessageToRoom 
    }}>
      {children}
    </ChatContext.Provider>
  );
};
