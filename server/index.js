const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')
const RootQuery = require('./schema/rootQuery.js')
const mutation = require('./schema/mutation.js')
const { UserType } = require('./schema/dataSchema.js')
const app = express()
dotenv.config()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}))
app.use(cors());

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development',
}))

app.use('/', (req, res) => {
  res.send("Hello World!")
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`)))
  .catch((error) => console.log(error.message))
