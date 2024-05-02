import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Modal from './Modal';
import Schema from './Schema';
import DynamicTable from './DynamicTable';

const App = () => {

  const deptEmpSchema = [
    { Field: "emp_no", Type: "int", Null: "NO", Key: "PRI", Default: "NULL", Extra: "" },
    { Field: "dept_no", Type: "char(4)", Null: "NO", Key: "PRI", Default: "NULL", Extra: "" },
    { Field: "from_date", Type: "date", Null: "NO", Key: "", Default: "NULL", Extra: "" },
    { Field: "to_date", Type: "date", Null: "NO", Key: "", Default: "NULL", Extra: "" }
  ];

  const departmentsSchema = [
    { Field: "dept_no", Type: "char(4)", Null: "NO", Key: "PRI", Default: "NULL", Extra: "" },
    { Field: "dept_name", Type: "varchar(40)", Null: "NO", Key: "UNI", Default: "NULL", Extra: "" }
  ];
  // State to hold the input field value
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [results, setResults] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to handle query submission
  const handleQuerySubmit = () => {
    // Endpoint of your backend server
    const endpoint = 'http://localhost:3000/execute-query';

    axios.post(endpoint, { sql: query })
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        alert('Failed to execute query: ' + error.message);
        setResults([]);
      });
  };

  // Example function for additional button
  const handleSpecificAction1 = () => {
    axios.get('http://localhost:3000/departments')
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the departments:', error);
      });
  };

  // Another example function for the second additional button
  const handleSpecificAction2 = () => {
    axios.get('http://localhost:3000/employee-details')
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee details:', error);
      });
  };
  return (
    <>
      <div className="app-container">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleQuerySubmit}>Submit Query</button>
        </div>
      </div>
      <button onClick={handleSpecificAction1}>Action 1 - Get all Departments</button>
      <button onClick={handleSpecificAction2}>Action 2 - Get 20 employee details along with department name</button>
      <div>
        <button onClick={openModal} style={{ marginTop: '10px' }}>View Database Schemas</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Schema data={deptEmpSchema} tableName="Department Employees - dept_emp" />
          <Schema data={departmentsSchema} tableName="Departments - departments" />
        </Modal>
      </div>
      <DynamicTable data={results} />
    </>
  );
}

export default App;
