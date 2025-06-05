import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setMessage("✅ Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage("❌ Login failed. No token received.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errMsg =
        error.response?.data?.message || "❌ Login failed. Check username and password.";
      setMessage(errMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-darkbg rounded shadow text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">🔐 Login</h2>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="input"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="input"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          🔑 Login
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default LoginPage;
