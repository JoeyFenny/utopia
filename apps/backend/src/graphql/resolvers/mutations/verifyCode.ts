import { gql } from 'graphql-tag';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

export const verifyCodeSchema = gql`
  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Mutation {
    verifyCode(email: String!, code: String!): AuthPayload!
  }
`;

export const verifyCodeResolver = {
  Mutation: {
    verifyCode: async (_: any, { email, code }: { email: string; code: string }, { prisma }: { prisma: PrismaClient }) => {
      try {
        // Find user and check verification code
        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) {
          throw new GraphQLError('User not found');
        }

        if (user.verificationCode !== code) {
          throw new GraphQLError('Invalid verification code');
        }

        // Clear the verification code and set emailVerified to true
        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            verificationCode: null,
            emailVerified: true
          }
        });

        // Generate JWT
        if (!process.env.JWT_SECRET) {
          throw new Error('JWT_SECRET is not configured');
        }

        const token = jwt.sign(
          { userId: updatedUser.id },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );

        return {
          token,
          user: updatedUser
        };
      } catch (error) {
        console.error('Error in verifyCode:', error);
        throw error;
      }
    }
  }
};

export default verifyCodeResolver;
