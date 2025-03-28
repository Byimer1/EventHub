import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:8000/auth/signup", {
        email,
        password,
      });
      alert("Signup successful");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <input className="border w-full mb-2 p-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border w-full mb-4 p-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white w-full p-2" onClick={handleSignup}>Signup</button>
    </div>
  );
}
