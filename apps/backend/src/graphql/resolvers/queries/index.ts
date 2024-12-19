import { meResolver } from './me';
import { feedExperiencesResolver } from './feedExperiences';

export const resolvers = {
  Query: {
    ...meResolver.Query,
    ...feedExperiencesResolver.Query,
  },
};

export default resolvers;
