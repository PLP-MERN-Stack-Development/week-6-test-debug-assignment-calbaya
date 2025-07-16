import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/bugs';

function App() {
  const [bugs, setBugs] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  const fetchBugs = async () => {
    const res = await axios.get(API_URL);
    setBugs(res.data);
  };

  useEffect(() => { fetchBugs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    setForm({ title: '', description: '' });
    fetchBugs();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API_URL}/${id}`, { status });
    fetchBugs();
  };

  const deleteBug = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchBugs();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">MERN Bug Tracker</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="border p-1 mr-2" required />
        <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className="border p-1 mr-2" required />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1">Submit</button>
      </form>
      <ul>
        {bugs.map(bug => (
          <li key={bug._id} className="border p-2 mb-2">
            <h3 className="font-semibold">{bug.title}</h3>
            <p>{bug.description}</p>
            <p>Status: {bug.status}</p>
            <button onClick={() => updateStatus(bug._id, 'in-progress')} className="mr-2 text-blue-500">In Progress</button>
            <button onClick={() => updateStatus(bug._id, 'resolved')} className="mr-2 text-green-500">Resolve</button>
            <button onClick={() => deleteBug(bug._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;