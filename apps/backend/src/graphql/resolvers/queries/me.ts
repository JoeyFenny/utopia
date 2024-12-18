import { gql } from 'graphql-tag';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

export const meSchema = gql`
  type Query {
    me: User
  }
`;

export const meResolver = {
  Query: {
    me: async (_: any, __: any, { prisma, userId }: { prisma: PrismaClient; userId?: string }) => {
      try {
        if (!userId) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { id: userId }
        });

        return user;
      } catch (error) {
        throw new GraphQLError('Failed to fetch user');
      }
    }
  }
};

export default meResolver;
