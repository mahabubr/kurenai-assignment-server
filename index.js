require('dotenv').config()
const express = require('express')
const app = express()
const post = process.env.PORT || 5000
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

// middle were 
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Server Running')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vlhy1ml.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const blogDatabase = client.db('blogDatabase').collection('blog')

        app.post('/blog', async (req, res) => {
            const query = req.body
            const result = await blogDatabase.insertOne(query)
            res.send(result)
        })

        app.get('/blog', async (req, res) => {
            const query = {}
            const result = await blogDatabase.find(query).sort({ _id: -1 }).toArray()
            res.send(result)
        })

    }
    catch (e) {
        console.log(e);
    }
}

run()

app.listen(post, () => {
    console.log(`Server Running on PORT ${post}`);
})