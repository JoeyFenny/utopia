import { gql } from 'graphql-tag';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

export const feedExperiencesSchema = gql`
  extend type Query {
    feedExperiences: [Experience!]!
  }
`;

export const feedExperiencesResolver = {
  Query: {
    feedExperiences: async (_: any, __: any, { prisma, userId }: { prisma: PrismaClient; userId?: string }) => {
      try {
        if (!userId) {
          throw new GraphQLError('Not authenticated');
        }

        // Get all experiences the user has already interacted with
        const userInteractions = await prisma.experienceInteraction.findMany({
          where: {
            userId,
          },
          select: {
            experienceId: true,
          },
        });

        const interactedExperienceIds = userInteractions.map((i) => i.experienceId);

        // Get all experiences that the user hasn't interacted with yet
        const experiences = await prisma.experience.findMany({
          where: {
            id: {
              notIn: interactedExperienceIds,
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        return experiences;
      } catch (error) {
        console.error('Error in feedExperiences:', error);
        throw error;
      }
    },
  },
};

export default feedExperiencesResolver;
