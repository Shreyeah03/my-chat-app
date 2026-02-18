import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      let userCredential;

  
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // New users → avatar not set
        const newUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          isAvatarImageSet: false
        };

        localStorage.setItem("chat-user", JSON.stringify(newUser));

        navigate("/setup-avatar");
        return;
      }

      // ✅ LOGIN FLOW
      const existingUser =
        JSON.parse(localStorage.getItem("chat-user")) || {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          isAvatarImageSet: false
        };

      localStorage.setItem("chat-user", JSON.stringify(existingUser));

      // Redirect based on avatar status
      if (!existingUser.isAvatarImageSet) {
        navigate("/setup-avatar");
      } else {
        navigate("/chat");
      }

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-sm bg-gray-900 p-8 rounded-xl">

        <h1 className="text-white text-2xl text-center">
          {isLogin ? "Login" : "Signup"}
        </h1>

        <input
          className="w-full mt-6 p-2 rounded bg-gray-800 text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mt-3 p-2 rounded bg-gray-800 text-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-600 py-2 rounded text-white"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          className="text-gray-400 text-center mt-4 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Signup"
            : "Already have account? Login"}
        </p>

      </div>
    </div>
  );
}
