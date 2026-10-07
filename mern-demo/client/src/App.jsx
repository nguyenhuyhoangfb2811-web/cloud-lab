import React, { useEffect, useState } from 'react';

function App() {
  const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000';

  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentId: '',
    name: '',
    email: '',
  });

  const [message, setMessage] = useState('');

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/students`);

      if (!res.ok) {
        throw new Error('Không thể tải danh sách sinh viên');
      }

      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi tải sinh viên:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Thêm sinh viên thất bại');
      }

      setForm({
        studentId: '',
        name: '',
        email: '',
      });

      setMessage('Thêm sinh viên thành công');

      fetchStudents();

      setTimeout(() => {
        setMessage('');
      }, 2500);
    } catch (error) {
      console.error(error);
      setMessage('Không thể thêm sinh viên');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Ní có chắc muốn xóa sinh viên này không?'
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/students/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Xóa sinh viên thất bại');
      }

      setMessage('Xóa sinh viên thành công');

      fetchStudents();

      setTimeout(() => {
        setMessage('');
      }, 2500);
    } catch (error) {
      console.error(error);
      setMessage('Không thể xóa sinh viên');
    }
  };

  const handleUpdate = async (id, oldName) => {
    const newName = prompt('Nhập họ tên mới:', oldName);

    if (!newName || newName.trim() === '' || newName === oldName) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Cập nhật sinh viên thất bại');
      }

      setMessage('Cập nhật sinh viên thành công');

      fetchStudents();

      setTimeout(() => {
        setMessage('');
      }, 2500);
    } catch (error) {
      console.error(error);
      setMessage('Không thể cập nhật sinh viên');
    }
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background:
        'radial-gradient(circle at 80% 80%, rgba(0, 200, 255, 0.18), transparent 30%), #081121',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px',
      boxSizing: 'border-box',
    },

    container: {
      maxWidth: '980px',
      margin: '0 auto',
    },

    header: {
      textAlign: 'center',
      padding: '30px 20px',
      borderRadius: '20px',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
      marginBottom: '24px',
    },

    smallTitle: {
      fontSize: '12px',
      letterSpacing: '2px',
      color: '#59cfff',
      fontWeight: 'bold',
      marginBottom: '12px',
    },

    title: {
      margin: 0,
      fontSize: '32px',
    },

    subtitle: {
      marginTop: '10px',
      color: '#b6c2d9',
      fontSize: '14px',
    },

    message: {
      textAlign: 'center',
      padding: '14px',
      marginBottom: '20px',
      borderRadius: '12px',
      background: 'rgba(0, 200, 130, 0.18)',
      border: '1px solid rgba(0, 255, 160, 0.2)',
      color: '#8affc1',
      fontWeight: 'bold',
    },

    grid: {
      display: 'grid',
      gridTemplateColumns: 'minmax(280px, 0.85fr) minmax(360px, 1.4fr)',
      gap: '20px',
      alignItems: 'start',
    },

    card: {
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '18px',
      padding: '24px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.22)',
    },

    cardTitle: {
      marginTop: 0,
      marginBottom: '20px',
      fontSize: '20px',
    },

    label: {
      display: 'block',
      marginBottom: '7px',
      fontSize: '13px',
      color: '#cbd5e1',
      fontWeight: 'bold',
    },

    input: {
      width: '100%',
      padding: '13px 14px',
      marginBottom: '16px',
      boxSizing: 'border-box',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.12)',
      background: 'rgba(255,255,255,0.08)',
      color: '#ffffff',
      outline: 'none',
    },

    addButton: {
      width: '100%',
      padding: '13px',
      border: 'none',
      borderRadius: '10px',
      background: '#22c55e',
      color: '#ffffff',
      fontWeight: 'bold',
      cursor: 'pointer',
    },

    listHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },

    count: {
      background: '#163965',
      color: '#8dd2ff',
      borderRadius: '999px',
      padding: '7px 11px',
      fontSize: '12px',
      fontWeight: 'bold',
    },

    student: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '16px',
      borderRadius: '14px',
      background: 'rgba(255,255,255,0.07)',
      marginBottom: '12px',
      border: '1px solid rgba(255,255,255,0.06)',
    },

    number: {
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      background: '#20baf5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      flexShrink: 0,
    },

    studentInfo: {
      flex: 1,
    },

    name: {
      margin: '0 0 7px 0',
      fontSize: '15px',
    },

    info: {
      margin: '3px 0',
      color: '#b8c2d4',
      fontSize: '12px',
    },

    actions: {
      display: 'flex',
      gap: '8px',
    },

    editButton: {
      border: 'none',
      padding: '8px 12px',
      borderRadius: '8px',
      background: '#fbbf24',
      color: '#111827',
      cursor: 'pointer',
      fontWeight: 'bold',
    },

    deleteButton: {
      border: 'none',
      padding: '8px 12px',
      borderRadius: '8px',
      background: '#ef4444',
      color: '#ffffff',
      cursor: 'pointer',
      fontWeight: 'bold',
    },

    empty: {
      textAlign: 'center',
      color: '#94a3b8',
      padding: '30px 10px',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.smallTitle}>
            MERN STACK • MONGODB ATLAS
          </div>

          <h1 style={styles.title}>
            Quản Lý Sinh Viên MERN
          </h1>

          <div style={styles.subtitle}>
            Giao diện quản lý sinh viên hiện đại, trực quan và dễ sử dụng
          </div>
        </div>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              Thêm sinh viên
            </h2>

            <form onSubmit={handleSubmit}>
              <label style={styles.label}>
                Mã số sinh viên
              </label>

              <input
                style={styles.input}
                placeholder="Ví dụ: B530001"
                value={form.studentId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    studentId: e.target.value,
                  })
                }
                required
              />

              <label style={styles.label}>
                Họ và tên
              </label>

              <input
                style={styles.input}
                placeholder="Nhập họ tên sinh viên"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                required
              />

              <label style={styles.label}>
                Email
              </label>

              <input
                style={styles.input}
                type="email"
                placeholder="Nhập email sinh viên"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
              />

              <button
                type="submit"
                style={styles.addButton}
              >
                + Thêm Sinh Viên
              </button>
            </form>
          </div>

          <div style={styles.card}>
            <div style={styles.listHeader}>
              <h2
                style={{
                  ...styles.cardTitle,
                  marginBottom: 0,
                }}
              >
                Danh sách sinh viên
              </h2>

              <div style={styles.count}>
                {students.length} sinh viên
              </div>
            </div>

            {students.length === 0 ? (
              <div style={styles.empty}>
                Chưa có dữ liệu sinh viên
              </div>
            ) : (
              students.map((student, index) => (
                <div
                  key={student._id}
                  style={styles.student}
                >
                  <div style={styles.number}>
                    {index + 1}
                  </div>

                  <div style={styles.studentInfo}>
                    <h3 style={styles.name}>
                      {student.name}
                    </h3>

                    <p style={styles.info}>
                      MSSV: {student.studentId}
                    </p>

                    <p style={styles.info}>
                      Email: {student.email}
                    </p>
                  </div>

                  <div style={styles.actions}>
                    <button
                      onClick={() =>
                        handleUpdate(
                          student._id,
                          student.name
                        )
                      }
                      style={styles.editButton}
                    >
                      Sửa
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(student._id)
                      }
                      style={styles.deleteButton}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;