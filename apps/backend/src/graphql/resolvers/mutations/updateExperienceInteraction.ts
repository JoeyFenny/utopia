import { gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

export const updateExperienceInteractionSchema = gql`
  extend type Mutation {
    updateExperienceInteraction(experienceId: ID!, isInterested: Boolean!): ExperienceInteraction!
  }
`;

export const updateExperienceInteractionResolver = {
  Mutation: {
    updateExperienceInteraction: async (
      _: any,
      { experienceId, isInterested }: { experienceId: string; isInterested: boolean },
      { prisma, userId }: { prisma: PrismaClient; userId?: string }
    ) => {
      try {
        if (!userId) {
          throw new GraphQLError('Not authenticated');
        }

        // Create or update the interaction
        const interaction = await prisma.experienceInteraction.upsert({
          where: {
            userId_experienceId: {
              userId,
              experienceId,
            },
          },
          update: {
            isInterested,
          },
          create: {
            userId,
            experienceId,
            isInterested,
          },
        });

        return interaction;
      } catch (error) {
        console.error('Error in updateExperienceInteraction:', error);
        throw error;
      }
    },
  },
};
