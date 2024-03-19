import React, { useState, useEffect } from 'react';
import "./table.css";

function Table1() {

  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    id:'',
    name: '',
    date: '',
    mssv: '',
    email: '',
    score: '',
    locate: '',
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/students')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch data');
      })
      .then(data => {
        
        const updatedData = data.map((student) => ({
          ...student,
        }));
        setStudents(updatedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDeleteRow = (id) => {
    console.log(id);
    const url = `http://127.0.0.1:8000/students/${id}`;
  
      fetch(url, {
        method: 'DELETE',})
      .then(response => {
        if (response.ok) {
          fetchData();
        } else {
          throw new Error('Failed to delete student');
        }
      })
      .catch(error => {
        console.error('Error deleting student:', error);
      });
  };

  const handleUpdateRow = (student) => {
    setSelectedStudent(student);
    
    setNewStudent({
      id:student.id,
      name: student.name,
      date: student.date,
      mssv: student.mssv,
      email: student.email,
      score: student.score,
      locate: student.locate,
    });
  };

  const updateStudent = () => {
    if (selectedStudent) {
      console.log(selectedStudent); 
      const url = `http://127.0.0.1:8000/students`;
  
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      })
      .then(response => {
        if (response.ok) {
          fetchData();
          setSelectedStudent(null);
          setNewStudent({
            name: '',
            date: '',
            mssv: '',
            email: '',
            score: '',
            locate: '',
          });
        } else {
          throw new Error('Failed to update student');
        }
      })
      .catch(error => {
        console.error('Error updating student:', error);
      });
    }
  };
  

  const addStudent = () => {
    fetch('http://127.0.0.1:8000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
    .then(response => {
      if (response.ok) {
        fetchData();
        setNewStudent({
          name: '',
          date: '',
          mssv: '',
          email: '',
          score: '',
          locate: '',
        });
      } else {
        throw new Error('Failed to add student');
      }
    })
    .catch(error => {
      console.error('Error adding student:', error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  return (
    <div className="table-container">
      <table className="table1">
        <thead>
          <tr>
            <th style={{ width: '5px', fontSize: '18px' }}>STT</th>
            <th>Name</th>
            <th>Date</th>
            <th>MSSV</th>
            <th>Email</th>
            <th>Score</th>
            <th>Locate</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr className='tr2' key={index}>
              <td>{index + 1}</td>
              <td style={{ textAlign: 'left' }}>{student.name}</td>
              <td style={{ textAlign: 'left' }}>{student.date}</td>
              <td style={{ textAlign: 'left' }}>{student.mssv}</td>
              <td style={{ textAlign: 'left' }}>{student.email}</td>
              <td style={{ textAlign: 'left' }}>{student.score}</td>
              <td style={{ textAlign: 'left' }}>{student.locate}</td>
              <td><button onClick={() => handleDeleteRow(student.id)}>Delete</button></td>
              <td><button onClick={() => handleUpdateRow(student)}>Update</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <table className="table2">
          <thead>
            <tr>
              <th colSpan="9" className="thName">String Input</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th style={{ padding: "10px", fontSize: '16px' }}>STT</th>
              <th>Name</th>
              <th>Date</th>
              <th>MSSV</th>
              <th>Email</th>
              <th>Score</th>
              <th>Locate</th>
              <th>Add Student</th>
              <th>Update</th>
            </tr>
          </tbody>
          <tbody>
            <tr >
              <td></td>
              <td><input type="text" name="name"  placeholder="Your name.." value={newStudent.name} onChange={handleChange} /></td>
              <td><input type="text" name="date"  placeholder="Date       " value={newStudent.date} onChange={handleChange} /></td>
              <td><input type="text" name="mssv"  placeholder="MSSV       " value={newStudent.mssv} onChange={handleChange} /></td>
              <td><input type="text" name="email" placeholder="Email      " value={newStudent.email} onChange={handleChange} /></td>
              <td><input type="text" name="score" placeholder="Score      " value={newStudent.score} onChange={handleChange} /></td>
              <td><input type="text" name="locate"placeholder="Locate     " value={newStudent.locate} onChange={handleChange} /></td>
              <td><button style={{ marginTop: '0px' }} className="button1" onClick={addStudent}>Add Student</button></td>
              <td><button style={{ marginTop: '0px' }} className="button1" onClick={updateStudent}>Update</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table1 