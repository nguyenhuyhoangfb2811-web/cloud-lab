import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', name: '', email: '' });

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ studentId: '', name: '', email: '' });
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' });
    fetchStudents();
  };

  const handleUpdate = async (id, oldName) => {
    const newName = prompt("Nhập họ tên mới:", oldName);
    if (newName && newName !== oldName) {
      await fetch(`http://localhost:5000/api/students/${id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
      });
      fetchStudents();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '600px', margin: 'auto', color: '#333' }}>
      <h2>Quản Lý Sinh Viên MERN Docker</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <input placeholder="MSSV (ví dụ: B530001)" value={form.studentId} onChange={e => setForm({...form, studentId: e.target.value})} style={{padding: '8px'}} required />
        <input placeholder="Họ tên" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{padding: '8px'}} required />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{padding: '8px'}} required />
        <button type="submit" style={{padding: '10px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer'}}>Thêm Sinh Viên</button>
      </form>
      <h3>Danh sách sinh viên:</h3>
      <ul style={{ paddingLeft: '20px' }}>
        {students.map(s => (
          <li key={s._id} style={{ marginBottom: '10px' }}>
            <b>{s.studentId}</b> - {s.name} ({s.email}) 
            <button onClick={() => handleUpdate(s._id, s.name)} style={{ marginLeft: '10px', background: '#FFC107', color: 'black', border: 'none', padding: '3px 8px', cursor: 'pointer' }}>Sửa</button>
            <button onClick={() => handleDelete(s._id)} style={{ marginLeft: '5px', background: '#f44336', color: 'white', border: 'none', padding: '3px 8px', cursor: 'pointer' }}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;