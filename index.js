const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
// const db = require('./db'); 


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.engine('ejs', require('ejs').renderFile);
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/static', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var customerTransaction;

// var db = mongoClient.connect(mongoDbUrl).then(db => {
//     // console.log('monginodb connected');
//     // return db
    
//     // dbcol = db.collection('customer_transaction'); 
//     // dbcol1 = db.collection('Users');
//     // dbcol2 = db.collection('Center')
//      // Reuse dbcol for DB CRUD operation
//     }).catch(err => {
// // logs message upon error connecting to mongodb
//     console.log('error connecting to mongodb', err);
// });
 // const record = (result).filter(function(rec) {
               // return (rec.agentsMSISDN).toString();
            //});
            //var string = JSON.stringify(record);
            //var objectValue = JSON.parse(string);



const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
	console.log('Server running at port 3000: http://localhost:3000');
});
