const express=require('express')
const dotenv=require('dotenv')
const {MongoClient}=require('mongodb')
const bodyparser=require('body-parser')
const cors=require('cors')
dotenv.config()
const url='mongodb://localhost:27017'
const client=new MongoClient(url)
const dbName='passop'
const app=express()
const port=3000
app.use(bodyparser.json())
app.use(cors())
client.connect()
//Get all the Passwords-
app.get('/',async(req,res)=>{
    const db=client.db(dbName)
    const collection=db.collection('documents')
    const findResult=await collection.find({}).toArray()
    res.json(findResult)
})

// Save a Password
app.post('/', async (req, res) => {

    const db = client.db(dbName)

    const collection = db.collection('documents')

    await collection.insertOne(req.body)

    res.json({
        message: "Password saved successfully"
    })
})

// Delete a Password
app.delete('/:id', async (req, res) => {

    const db = client.db(dbName)

    const collection = db.collection('documents')

    await collection.deleteOne({
        id: req.params.id
    })

    res.json({
        message: "Password deleted successfully"
    })
})
// Update a Password
app.put('/:id', async (req, res) => {

    const db = client.db(dbName)

    const collection = db.collection('documents')

    await collection.updateOne(
        { id: req.params.id },
        {
            $set: {
                site: req.body.site,
                username: req.body.username,
                password: req.body.password
            }
        }
    )

    res.json({
        message: "Password updated successfully"
    })
})
app.listen(port,()=>{
    console.log(`Server Listening on http://localhost:${port}`)
})