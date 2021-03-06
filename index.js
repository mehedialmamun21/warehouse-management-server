const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mtnn5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

  try {
    await client.connect();
    const productCollection = client.db('wareHouse').collection('product');

    app.get('/product', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    })

    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    })

    // POST

    app.post('/product', async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    })


    // Update Quantity

    app.put('/product/:id', async (req, res) => {
      const id = req.params.id;
      const updatedQuantity = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          quantity: updatedQuantity.quantity,
        }
      };
      const result = await productCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    })


    // DELETE

    app.delete('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

  }
  finally {

  }

}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Running My Smartphone-Warehouse-Server');

});

app.listen(port, () => {
  console.log('Warehouse Server is running');
})



{/* <img src={product.img} alt="" />
                            <h4>Name : {product.name}</h4>
                            <p>Price : {product.price}</p>
                            <p>Description : <small>{product.description}</small></p>
                            <p>Supplier : {product.supplier}</p>
                            <p>Quantity : {product.quantity}</p>
                            <button onClick={() => handleDelete(product._id)} className='btn btn-danger' >Delete</button> */}