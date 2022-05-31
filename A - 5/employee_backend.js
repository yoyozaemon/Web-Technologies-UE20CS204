const express = require("express");
const app = express();
const path = require("path");
const {MongoClient} = require("mongodb");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const uri = "mongodb://localhost:27017/Employee"

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"employee.html"));
})


app.post("/login",(req,res)=>{

    const query1 = req.body;

    const main_1 = async () => {
        MongoClient.connect(uri, async (err, client) => {
            if (err) throw err;
          const check = await client.db("Employee").collection("resume").findOne(query1);
          if (check == null) {
            await client.db("Employee").collection("resume").insertOne(query1);
            client.close();
            res.send(`
                <h1>Employee inserted details</h1>
<h2>Employee name:${req.body.name}</h2>
<h2>Employee date of birth:${req.body.dob}</h2>
<h2>Employee qualification:${req.body.Qualification}</h2>
<img src=${req.body.image}>Employee image</img>
                `);

          } else {
            res.send(`
        <h1>Data is already present in the database</h1>
        `);

          }
        });
      };
  	 Watch.html
<!DOCTYPEhtml>
<head>
<title>watches</title>
</head>
<body>
<br/>
<br/>
<br/>
<br/>
<div align="center">
<h1>Enter the watch model details</h1>
<form action="/login"method="POST">
<label for="model_no">Enter model Number:</label>
<input type="text"name="model_no"placeholder="model_no">
<br/>
<br/>
<br/>
<br/>
<label for="model_price">Enter model Price:</label>
<input type="text"name="model_price"placeholder="model_price">
<br/>
<br/>
<br/>
<label for="model_comp">Enter model Company:</label>
<input type="text"name="model_comp"placeholder="model_comp">
<br/>
<br/>
<br/>
<input type="submit">
</form>
<br/>
<br/>
<br/>
<br/>
<a href="/update"><strong>Update the Watch model details</strong></a> </div>
</body>
</html>

update.html

<!DOCTYPEhtml>
<head>
<title>watches</title> </head>
<body>
<br/>
<br/>
<br/>
<br/>
<div align="center">
<h1>Update the watch model details</h1>
<form action="/login/update"method="POST">
<label for="model_no">Enter model Number:</label>
<input type="text"name="model_no"placeholder="model_no">
<br/>
<br/>
<br/>
<br/>
<labelfor="model_price">Enter model Price:</label>
<input type="text"name="model_price"placeholder="model_price">
<br/>
<br/>
<br/>
<label for="model_comp">Enter model Company:</label>
<input type="text"name="model_comp"placeholder="model_comp">
<br/>
<br/>
<br/>
<input type="submit">
</form>
<br/>
<br/>
<br/>
<br/>
</div>
</body>
</html>

Backend.js

const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb://localhost:27017/Watch";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "watch.html"));
});

app.post("/login", (req, res) => {
  const query1 = req.body;

    const main_1 = async () => {
        MongoClient.connect(uri, async (err, client) => {
            if (err) throw err;
          const check = await client
            .db("Watch")
            .collection("watches")
            .findOne(query1);
          if (check == null) {
            await client.db("Watch").collection("watches").insertOne(query1);
            client.close();
            res.send(`
               <h1>Watch inserted details</h1>
			<h2>Watch model number:${req.body.model_no}</h2>
            <h2>Watch model Price:${req.body.model_price}</h2>
            <h2>Watch model company:${req.body.model_comp}</h2>
                `);

          } else {
            res.send(`
        <h1>Data is already present in the database</h1>
        `);

          }
        });
      };
      main_1();
});

app.post("/login/update", (req, res) => {
  const query2 = {
    model_no:req.body.model_no,
    model_comp:req.body.model_comp
  };
  const update = {
    model_price: req.body.model_price,
  };

  const main2 = async () => {
    MongoClient.connect(uri, async (err, client) => {
        if (err) throw err;
      const check = await client.db("Watch").collection("watches").findOne(query2);
      if (check == null) {
        res.send(`<h1>Data is not present in the database</h1>`);
      }
      else {
        await client.db("Watch").collection("watches").updateOne(query2, {
          $set: update,
        });
        client.close();
        res.send(`
        <h1>Watch updated details</h1>
<h2>Watch model number:${req.body.model_no}</h2>
<h2>Watch model Price:${req.body.model_price}</h2>
<h2>Watch model company:${req.body.model_comp}</h2>
        `);

      }
    });
  };
  main2();
});

app.get("/update", (req, res) => {
  res.sendFile(path.join(__dirname, "update.html"));
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});

employee.html

<!DOCTYPEhtml>
<head>
<title>watches</title>
</head>
<body>
<br/>
<br/>
<br/>
<br/>
<div align="center">
<h1>Enter the Employee details</h1>
<form action="/login"method="POST">

<br/>
<br/>
<br/>
<br/>
<label>Enter Employee name:</label>
<input type="text"name="name"placeholder="Enteryourname">
<br/>
<br/>
<br/>
<br/>
<label>Enter date of birth:</label>
<input type="datetime"name="dob"placeholder="Enteryourdateof birth">
<br/>
<br/>
<br/>
<label>Enter the Qualification:</label>
<input type="text"name="Qualification"placeholder="Enter Qualification">
<br/>
<br/>
<br/>
<label>Enter the Job experience:</label>
<input type="text"name="exp"placeholder="EnterJobexperience">
<br/>
<br/>
<br/>
<input type="file"name="image">
<input type="submit"value="upload">
</form>
<br/>
<br/>
<br/>
<br/>
<a href="/update"><strong>Upload the Employee photo</strong></a>
</div> </body>
</html>
employee_update.html

<!DOCTYPEhtml>
<head>
<title>watches</title>
</head>
<body>
<br/>
<br/>
<br/>
<br/>
<div align="center">
<h1>Update the Employee image</h1>
<form action="/login/update"method="POST">
<br/>
<br/>
<br/>
<br/>
<label>Enter Employee name:</label>
<input type="text"name="name"placeholder="Enter your name">
<br/>
<br/>
<br/>
<input type="file"name="image">
<input type="submit"value="upload">
</form>
<br/>
<br/>
<br/>
<br/>
</div> </body>
</html>

employee_backend.js

const express = require("express");
const app = express();
const path = require("path");
const {MongoClient} = require("mongodb");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const uri = "mongodb://localhost:27017/Employee"

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"employee.html"));
})


app.post("/login",(req,res)=>{

    const query1 = req.body;

    const main_1 = async () => {
        MongoClient.connect(uri, async (err, client) => {
            if (err) throw err;
          const check = await client.db("Employee").collection("resume").findOne(query1);
          if (check == null) {
            await client.db("Employee").collection("resume").insertOne(query1);
            client.close();
            res.send(`
                <h1>Employee inserted details</h1>
<h2>Employee name:${req.body.name}</h2>
<h2>Employee date of birth:${req.body.dob}</h2>
<h2>Employee qualification:${req.body.Qualification}</h2>
<img src=${req.body.image}>Employee image</img>
                `);

          } else {
            res.send(`
        <h1>Data is already present in the database</h1>
        `);

          }
        });
      };
      main_1();
})


app.post("/login/update",(req,res)=>{
    const query2 = {
        name : req.body.name
    }
    const update = {
        image : req.body.image
    }

    const main2 = async () => {
        MongoClient.connect(uri, async (err, client) => {
            if (err) throw err;
          const check = await client.db("Employee").collection("resume").findOne(query2);
          if (check == null) {
            res.send(`<h1>Data is not present in the database</h1>`);
          }
          else {
            await client.db("Employee").collection("resume").updateOne(query2, {
              $set: update,
            });
            client.close();
            res.send(`
            <h1>Employee Updated details</h1>
           <h2>Employee name:${req.body.name}</h2>
           <img src=${req.body.image}>Employee image</img>
            `);


          }
        });
      };
      main2();
})

app.get("/update",(req,res)=>{
    res.sendFile(path.join(__dirname,"employee_update.html"));
})

app.listen(4000,()=>{
    console.log("Listening to port 4000");
}) q



