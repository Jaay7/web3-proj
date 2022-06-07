import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { initializeApp } from 'firebase/app';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

const Server = async () => {
  const firebaseapp = initializeApp(firebaseConfig);
  if (firebaseapp) {
    console.log('Firebase app initialized');
  } else {
    console.log('Firebase app not initialized');
  }

  const app = express();

  app.disable('x-powered-by');

  app.use(bodyParser.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });
  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

  app.listen({ port: process.env.PORT || 3060 }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 3060}${server.graphqlPath}`);
  });
};

Server();
