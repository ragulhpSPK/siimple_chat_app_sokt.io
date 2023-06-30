import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("https://chat-app-server-lime.vercel.app");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Typing...."
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room Id...."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={userName} room={room} />
      )}
    </div>
  );
}

export default App;
