import { meResolver } from './me';

export const resolvers = {
  Query: {
    ...meResolver.Query,
  },
};

export default resolvers;
