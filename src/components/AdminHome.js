import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
const AdminHome = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openAddStudentDialog, setOpenAddStudentDialog] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch('http://localhost:8080/students')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students:', error));
  };

  const CloseEditStudentDialog = () => {
    setSelectedStudent(null);
  };

  const Edit = (student) => {
    setSelectedStudent(student);
  };

  const Delete = (id, force = false) => {
    if (window.confirm(`Are you sure you want to ${force ? 'force delete' : 'delete'} this student?`)) {
        const url = force ? `http://localhost:8080/students/${id}?force=true` : `http://localhost:8080/students/${id}`;
        fetch(url, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 204 || response.status === 200) { 
               
                setStudents(students.filter((student) => student.studentId !== id));
            } else if (response.status === 409) {
                
                if (!force) {
                    window.alert('Cannot delete student as there are enrollments. Use FORCE=true to override.');
                } else {
                    setStudents(students.filter((student) => student.studentId !== id));
                }
            } else {
                console.error('Unexpected response status:', response.status);
            }
        })
        .catch((error) => console.error(`Error ${force ? 'force deleting' : 'deleting'} student:`, error));
    }
};


  const OpenAddStudentDialog = () => {
    setOpenAddStudentDialog(true);
  };

  const CloseAddStudentDialog = () => {
    setOpenAddStudentDialog(false);
  };

  return (
    <div>
      <h3>Student List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => Edit(student)}>Edit</button>
                <button onClick={() => Delete(student.studentId)}>Delete</button>
                <button onClick={() => Delete(student.studentId, true)}>Force Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={OpenAddStudentDialog}>Add Student</button>
      {selectedStudent && (
        <EditStudent
          student={selectedStudent}
          onEdit={(editedStudent) =>
            setStudents(
              students.map((student) =>
                student.studentId === editedStudent.studentId ? editedStudent : student
              )
            )
          }
          onClose={CloseEditStudentDialog}
        />
      )}
      {openAddStudentDialog && (
        <AddStudent
          onAdd={(newStudent) => setStudents([...students, newStudent])}
          onClose={CloseAddStudentDialog}
        />
      )}
    </div>
  );
};

export default AdminHome;

