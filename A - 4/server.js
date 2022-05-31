var http = require('http');
var MongoClient = require('mongodb').MongoClient;

http.createServer((request, response) => {
    if (request.method == 'POST'){
        console.log("Got a request!");
        response.writeHead(200);
        let str = ''
        request.on('data', (chunk) => {
            str += chunk;
        });
        request.on('end', () => {
            let data = JSON.parse(str);
            const db_url = 'mongodb://localhost:27017';
            MongoClient.connect(db_url, (err, db) => {
                if (err) throw err;
                var dbo = db.db('healthcare_db');
                dbo.collection('healthcare').insertOne(data, (err, res) => {
                    if (err) throw err;
                    console.log("Successfully inserted!");
                    response.write('Successfully inserted!');
                    response.end();
                    db.close();
                });
            });
        });
    }
    else{
        response.writeHead(403);
        response.write("Forbidden to access this!");
        response.end();
    }
}).listen(8081);

