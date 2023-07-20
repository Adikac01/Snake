const express = require('express');
const mysql = require('mysql')
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
   host: "localhost",
   user: "Adikac",
   password: "123456",
   database: "snake"
 });


 // Function to add a new score
 function addScore(name, score, callback) {
   pool.getConnection(function(err,connection) {
     if (err) {
       console.error('Error connecting to the database:', err);
       callback({ error: 'Database connection error' });
       return;
     }
 
     const sql = "INSERT INTO score (name, score) VALUES (?, ?)";
     const values = [name, score];
 
     connection.query(sql, values, function(err, result) {
      connection.release(); // Release the connection back to the pool

       if (err) {
         console.error('Error inserting score:', err);
         callback({ error: 'Error inserting score' });
         return;
       }
 
       console.log("1 record inserted");
       callback({ success: true });
     });
   });
 }
 
 // Function to retrieve top 10 scores
 function getTop10(callback) {
   pool.getConnection(function(err,connection) {
     if (err) {
       console.error('Error connecting to the database:', err);
       callback({ error: 'Database connection error' });
       return;
     }
 
     const sql = "SELECT * FROM score ORDER BY score DESC LIMIT 10";
 
     connection.query(sql, function(err, result) {
      connection.release();
       if (err) {
         console.error('Error retrieving top 10 scores:', err);
         callback({ error: 'Error retrieving top 10 scores' });
         return;
       }
       callback(result);
     });
   });
 }

 function getTop1(callback) {
   pool.getConnection(function(err,connection) {
     if (err) {
       console.error('Error connecting to the database:', err);
       callback({ error: 'Database connection error' });
       return;
     }
 
     const sql = "SELECT score FROM `score` WHERE score = (SELECT MAX(score) from score)";
 
     connection.query(sql, function(err, result) {
      connection.release();
       if (err) {
         console.error('Error retrieving top 10 scores:', err);
         callback({ error: 'Error retrieving top 10 scores' });
         return;
       }
       callback(result);
     });
   });
 }

 // API endpoint for adding a new score
app.post('/score', (req, res) => {
   const { name, score } = req.body;
 
   addScore(name, score, function(response) {
     res.json(response);
   });
 });
 
 // API endpoint for getting top 10 scores
 app.get('/top10', (req, res) => {
   getTop10(function(response) {
     res.json(response);
   });
 });

 app.get('/highest', (req, res) => {
   getTop1(function(response) {
      res.json(response);
   })
 })
 
 app.listen(port, () => {
   console.log(`Server running on port ${port}`);
 });

