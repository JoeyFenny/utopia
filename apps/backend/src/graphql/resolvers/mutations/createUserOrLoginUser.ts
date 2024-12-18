import { gql } from 'graphql-tag';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const createUserOrLoginUserSchema = gql`
  input EmailInput {
    email: String!
  }

  type AuthResponse {
    success: Boolean!
    error: String
    user: User
    isNewUser: Boolean!
  }

  type Mutation {
    createUserOrLoginUser(input: EmailInput!): AuthResponse!
  }
`;

export const createUserOrLoginUserResolver = {
  Mutation: {
    createUserOrLoginUser: async (_: any, { input }: { input: { email: string } }, { prisma }: { prisma: PrismaClient }) => {
      try {
        const { email } = input;

        // Validate email format
        if (!EMAIL_REGEX.test(email)) {
          return {
            success: false,
            error: "Please enter a valid email address",
            user: null,
            isNewUser: false
          };
        }

        // Check if user exists
        let user = await prisma.user.findUnique({
          where: { email }
        });

        const isNewUser = !user;

        // If user doesn't exist, create them with emailVerified false
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              emailVerified: false,
              notificationsEnabled: false
            }
          });
        }

        // Update user with new verification code
        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            verificationCode: '1234'
          }
        });

        return {
          success: true,
          error: null,
          user: updatedUser,
          isNewUser
        };
      } catch (error) {
        console.error('Error in createUserOrLoginUser:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "An error occurred while processing your request",
          user: null,
          isNewUser: false
        };
      }
    }
  }
};

export default createUserOrLoginUserResolver;
