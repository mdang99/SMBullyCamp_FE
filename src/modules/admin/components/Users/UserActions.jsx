import { useState } from "react";

export default function UserActions({ onAddUser, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !email)
      return alert("Vui lòng nhập đầy đủ thông tin.");

    onAddUser({ username, password, email, role: "user" });
    setUsername("");
    setPassword("");
    setEmail("");
    onClose();
  };

  return (
    <div className="w-full p-4 sm:p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Thêm người dùng mới
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="flex flex-col sm:flex-row justify-end sm:gap-2 gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 text-gray-600 text-sm hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
}
