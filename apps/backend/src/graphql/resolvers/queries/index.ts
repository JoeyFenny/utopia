import { meResolver } from './me';
import { feedExperiencesResolver } from './feedExperiences';
import { experienceResolver } from './experience'

export const resolvers = {
  Query: {
    ...meResolver.Query,
    ...feedExperiencesResolver.Query,
    ...experienceResolver.Query,
  },
};

export default resolvers;
