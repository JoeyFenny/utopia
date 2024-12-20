import { IContext } from '../../../types';

export const createExperienceResolver = {
  Mutation: {
    createExperience: async (
      _: any,
      { name, bio, cost, city, date, carouselPhotos }: {
        name: string;
        bio: string;
        cost: number;
        city: string;
        date: Date;
        carouselPhotos: string[];
      },
      { prisma }: IContext
    ) => {
      const experience = await prisma.experience.create({
        data: {
          name,
          bio,
          cost,
          city,
          date,
          carouselPhotos,
        },
      });
      return experience;
    },
  },
};

export default createExperienceResolver;
