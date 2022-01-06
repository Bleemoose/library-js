const express = require('express'), bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
//init
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

const PORT  = 3000;

//DataBase stuff
//ceonnection info
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'password',
  database: 'online_library'
});

//establish connections
connection.connect(function (err) {
  if (err) {
    return console.error(err.message);
  }
  console.log('Successfuly connected to the MySQL server.');
});


//home route
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/frontend.html'));

});


//used a lot of information from here:
//https://www.w3schools.com/nodejs/nodejs_mysql.asp

//add new book to db
//TODO: change in frontend book -> title
app.post('/books', function (req, res) {
  let sql = 'INSERT INTO books SET ?'
  let post = {
    author: req.body.author,
    title: req.body.title,
    genre: req.body.genre,
    price: req.body.price
  }
  connection.query(sql, post);
  res.end();
});


//send to frontend books that match
app.get('/books/:book_name', function (req, res) {

  const book_name = "%" + req.params.book_name + "%";

  let sql = 'SELECT * FROM books WHERE title LIKE ?';
  connection.query(sql, book_name, (err, result) => {
    res.json(result);
  });

});

//app start
app.listen(PORT, function () {
  console.log('Server Started at port ' + PORT + '...');
});