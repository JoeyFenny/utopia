import { gql } from 'graphql-tag';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

export const verifyCodeSchema = gql`
  input VerifyCodeInput {
    email: String!
    code: String!
  }

  type AuthResponse {
    success: Boolean!
    error: String
    user: User
    token: String
  }

  type Mutation {
    verifyCode(input: VerifyCodeInput!): AuthResponse!
  }
`;

export const verifyCodeResolver = {
  Mutation: {
    verifyCode: async (_: any, { input }: { input: { email: string; code: string } }, { prisma }: { prisma: PrismaClient }) => {
      try {
        const { email, code } = input;

        // Find user and check verification code
        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) {
          return {
            success: false,
            error: 'User not found',
            user: null,
            token: null
          };
        }

        if (user.verificationCode !== code) {
          return {
            success: false,
            error: 'Invalid verification code',
            user: null,
            token: null
          };
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
          success: true,
          error: null,
          user: updatedUser,
          token
        };
      } catch (error) {
        console.error('Error in verifyCode:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'An error occurred while verifying code',
          user: null,
          token: null
        };
      }
    }
  }
};

export default verifyCodeResolver;
