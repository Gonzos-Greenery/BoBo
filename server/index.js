import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'



async function initServer() {
  const app = express()
  app.use(cors())
  dotenv.config()
  const apolloServer = new ApolloServer({typeDefs, resolvers})
  await apolloServer.start()
  apolloServer.applyMiddleware({app})
  app.use((req, res) => {
    res.send('Server started successfully')
  })
  const PORT = process.env.PORT || 8080
  try {
    await mongoose.connect(process.env.mongodb)
    console.log(`Connected to MongoDB at port ${PORT} `)
  } catch (error) {
    console.log(error)
  }

  app.listen(PORT, () =>
  console.log(`Express server is running on port ${PORT}`))
}

initServer()
