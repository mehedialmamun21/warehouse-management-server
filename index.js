const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mtnn5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");

  console.log('warehouse of smartphone DB connected');

  // perform actions on the collection object
  client.close();
});





app.get('/', (req,res) => {
    res.send('Running My Smartphone-Warehouse-Server');

});

app.listen(port, () => {
    console.log('Warehouse Server is running');
})

