import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";

import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";

import connectDB from "./database/db.js";
connectDB();

const app = express();
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);
app.use(express.json()); // for parsing application/json

const port = process.env.PORT || 5000;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();
apolloServer.applyMiddleware({ app: app });

app.listen(port, () => console.log(`App is listening on the port ${port}`));
