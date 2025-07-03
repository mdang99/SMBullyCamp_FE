import { useState } from "react";

export default function UserActions({ onAddUser, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !email) return alert("Vui lòng nhập đầy đủ thông tin.");

    // Gọi hàm onAddUser với dữ liệu người dùng
    onAddUser({ username, password, email, role: "user" });
    
    setUsername("");
    setPassword("");
    setEmail("")
    onClose();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Thêm người dùng mới</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-md px-4 py-2 bg-input text-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md px-4 py-2 bg-input text-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-md px-4 py-2 bg-input text-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-muted-foreground bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
}
