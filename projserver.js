const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')

const app = express()
app.use(express.json())
app.use(cors())

const uri = " your mongodb connection url";

const client = new MongoClient(uri);
client.connect();
const db = client.db("tfddata");
const col = db.collection("tfd");

app.post('/insert',(request,response) => {
  response.send('YOUR EXPRESS BACKEND IS CONNECTED TO REACT');
  console.log(request.body)
  col.insertOne(request.body)
  console.log("Documents Inserted");

})


app.get('/check', (request,response)=> {

  async function run () {
    try {
      console.log(request.query.un);
      const result = await col.findOne({email:request.query.un})
      if (result != null) {
        console.log(result.email);
        if (result.password === request.query.pw) {
          response.send("pass");
        }
        else {
          response.send("fail");
        }
      }
      else {
        response.send("fail");
      }
    }
    finally {
    
    }
  }
  run().catch(console.dir);
})


app.listen(8082)
//localhost:8082
console.log("server started")