import { useEffect, useState } from "react";

const API = "/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const load = async () => {
    const res = await fetch(`${API}/notes`);
    const data = await res.json();
    setNotes(data);
  };

  const add = async () => {
    await fetch(`${API}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📘 Notes App</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={add}>Add</button>

      <ul>
        {notes.map((n) => (
          <li key={n.id}>{n.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;