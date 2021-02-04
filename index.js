const express = require('express')
const dotenv=require('dotenv').config()
const mysql = require('mysql')
es6Renderer = require('express-es6-template-engine')
app = express();
const port = 3000;
  
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

// const mysqlhost = process.env.DB_HOST;
// const mysqluser = process.env.DB_USER;
// const mysqlpass = process.env.DB_PASSWORD;
// const mysqldb = process.env.DB_NAME;

const mysqlhost = 'database-instace.cclmyblmrgmi.us-east-1.rds.amazonaws.com';
const mysqluser = 'root';
const mysqlpass = 'password';
const mysqldb = 'bluegreen';

console.log(mysqlhost)
console.log(mysqluser)
console.log(mysqlpass)
console.log(mysqldb)



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())



var con = mysql.createConnection({
  host: mysqlhost,
  user: mysqluser,
  password: mysqlpass,
  database:mysqldb
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to rds!");
});


// app.get('/', function(req, res) {
//   res.render('index', {locals: {title: 'Welcome!'}});
// });


app.get("/home",(request, response)=>{
            response.render('index', {locals: {title:'welcome'}});
});


//health
app.get("/health",(request, response)=>{
  var queryText = "select * from blue";
  con.query(queryText,(err, result)=>{
      if(response.statusCode==result[0].statuscode)
          {
            console.log('statuscode',result[0].statuscode);
            response.send(response.statusCode);
          }
          else{
            response.send(result[0].statuscode);  
          }
  });
});


 
//app.listen(3000);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
