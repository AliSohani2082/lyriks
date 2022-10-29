const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema.js')

const app = express()
dotenv.config()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}))
app.use(cors());


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
  .catch((error) => console.log(error.message))

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`))
