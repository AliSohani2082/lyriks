import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'
// import RootQuery from './schema/rootQuery'
import { UserType } from './models/User'

const app = express()
dotenv.config()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}))
app.use(cors());

// const schema = GraphQLSchema({
//   query: RootQuery,
//   mutation
// })

// app.use('/graphql', graphqlHTTP({
//   schema,
//   graphiql: process.env.NODE_ENV === 'development',
// }))

app.use('/', (req, res) => {
  res.send("Hello World!")
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`)))
  .catch((error) => console.log(error.message))
