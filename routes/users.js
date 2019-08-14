var express = require('express');
var app = express.Router();


/* GET users listing. */
app.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb://localhost:27017/airtel_money';
var dbcol;
var winners;

    
mongoClient.connect(mongoDbUrl).then(db => {
    console.log('mongodb connected');
    dbcol = db.collection('agent_transaction'); 
    //winners = db.collection('winner');
    // Reuse dbcol for DB CRUD operation
    }).catch(err => {
    // logs message upon error connecting to mongodb
    console.log('error connecting to mongodb', err);
});



app.get('/displayphone', function(req, res) {	
    // console.log("Queries", req.query);
    // console.log("Params", req.params);
    //maxTimeMS(100000000);
    //dbcol.createIndex({agentsMSISDN:1,_id:1});
    dbcol.find({}).maxTimeMS(10000000).toArray (function(err, result) {
        if (err) {
            return res.status(400).send({message: "Bad Request"});
        } else {
          
            return res.json({length: (result || [])});
        }
    });
});


app.get('/phone_count', function(req, res) {	
    // console.log("Queries", req.query);
    // console.log("Params", req.params);
    console.log("Phone", req.query.phone);
    return dbcol.find({}).maxTimeMS(1000000000).toArray (function(err, result) {
        if (err) {
            return res.status(400).send({message: "Bad Request"});
        } else {
            const record = (result).filter(function(rec) {
                return (rec.agentsMSISDN).toString().includes(req.query.phone);
            });
            

            return res.json({length: (record || []).length});
        }
    });
});

app.get('/delete/:number', function(req, res) {	
    // console.log("Queries", req.query);
    // console.log("Params", req.params);
    const winner = req.params.number;
    // return dbcol.aggregate([{ $sample: { size: 1 } }],(async function(err, result) {
    //     if (err) {
    //         return res.status(400).send({message: "Bad Request"});
    //     } else {
    //         const record = (result).filter(function(rec) {
    //             return (rec.AgentsMSISDN).toString();
    //         });
    //         var string = JSON.stringify(record);
    //         var objectValue = JSON.parse(string);
    //         // console.log(objectValue[0]["AgentsMSISDN"]);
    //         const random = objectValue[0]["AgentsMSISDN"];
    //         //  const saved =  await winners.insert() ;
            if(winner) {
                console.log(winner);
                 winners.insert({
                    phone: winner,
                    day: new Date().getDate(),
                    month: new Date().getMonth(),
                    year: new Date().getFullYear()

                    
                }, function(err, result) {
                    if(err) return res.status(500).send(err);
                    // remove from here 
                    var intWinner = parseInt(winner)
                    dbcol.remove({agentsMSISDN: intWinner}, function(err, result) {
                        if(err) return res.status(500).send(err);
    
                        return res.json({random: (winner || []).toString()})
                    })
    
                })
            } else {
                
            return res.status(404).send({message: "Could not randomize number"})
        }
            // {winner: random, timestamp: new Date().getTime()}

            /*
            Before return the response to the client 

            1. Save this number into winner table
                delete if and only if saved was successful
            2. perform any delete here as well
                make sure you delete before return the response to the client
            3. return the winner
             */

            // return res.json({random: objectValue[0]["AgentsMSISDN"]});
        // }

    // }));
        
});



app.get('*', function(req, res) {
    return res.status(400).send({
        message: "404 Not Found"
    })
})

module.exports = app;
