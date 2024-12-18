/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { rule, shield, allow } from 'graphql-shield';
import { applyMiddleware } from 'graphql-middleware';
import { GraphQLError } from 'graphql';

import typeDefs from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

dotenv.config();

const prisma = new PrismaClient();

const createContext = async ({ req }: any) => {
  const context: any = {
    prisma,
  };

  const token = req?.headers?.authorization?.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      context.userId = decoded.userId;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  return context;
};

const isAuthenticated = rule()(async (parent, args, context) => {
  if (!context.userId) {
    throw new GraphQLError('Not authenticated');
  }
  return true;
});

const permissions = shield({
  Query: {
    me: isAuthenticated
  },
  Mutation: {
    updateNotifications: isAuthenticated
  }
}, {
  allowExternalErrors: true,
  fallbackRule: allow
});

async function setupServer() {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const schemaWithPermissions = applyMiddleware(schema, permissions);

  const server = new ApolloServer({
    schema: schemaWithPermissions,
    context: createContext,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return error;
    }
  });

  const port = process.env.PORT || 4000;
  const { url } = await server.listen({ port });
  console.log(`🚀 Server ready at ${url}`);
}

setupServer().catch(console.error);
