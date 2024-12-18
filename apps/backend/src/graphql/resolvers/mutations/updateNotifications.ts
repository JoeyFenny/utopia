import { gql } from 'graphql-tag';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

export const updateNotificationsSchema = gql`
  type Mutation {
    updateNotifications(enabled: Boolean!): UpdateResponse!
  }
`;

export const updateNotificationsResolver = {
  Mutation: {
    updateNotifications: async (_: any, { enabled }: { enabled: boolean }, { prisma, userId }: { prisma: PrismaClient; userId?: string }) => {
      try {
        if (!userId) {
          return {
            success: false,
            error: "Authentication required",
            user: null
          };
        }

        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { notificationsEnabled: enabled }
        });

        return {
          success: true,
          error: null,
          user: updatedUser
        };
      } catch (error) {
        console.error('Error in updateNotifications:', error);
        return {
          success: false,
          error: "Failed to update notifications settings",
          user: null
        };
      }
    }
  }
};

export default updateNotificationsResolver;
