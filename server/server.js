const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


// Create connection to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // your MySQL username
    password: 'root',  // your MySQL password
    database: 'employees'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

const app = express();

app.use(cors());

app.use(express.json()); // for parsing application/json

// Endpoint for executing a custom query
app.post('/execute-query', (req, res) => {
    const { sql } = req.body;  // Get SQL query from client
    if (!sql) {
        return res.status(400).json({ error: 'No SQL query provided.' });
    }

    // Execute the custom SQL query
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to execute query', details: err });
        }
        res.status(200).json(results);
    });
});

//list of all available departments
app.get('/departments', (req, res) => {
    const sql = 'SELECT * FROM departments';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.json(results);
    });
});

//sends details for twenty employees along with their department names using a JOIN operation
app.get('/employee-details', (req, res) => {
    const sql = `
        SELECT de.emp_no, de.dept_no, de.from_date, de.to_date, d.dept_name
        FROM dept_emp de
        JOIN departments d ON de.dept_no = d.dept_no    
        LIMIT 20;
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.json(results);
    });
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
