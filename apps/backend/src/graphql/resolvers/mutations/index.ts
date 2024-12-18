import { createUserOrLoginUserResolver } from './createUserOrLoginUser';
import { verifyCodeResolver } from './verifyCode';
import { updateNotificationsResolver } from './updateNotifications';

export const resolvers = {
  Mutation: {
    ...createUserOrLoginUserResolver.Mutation,
    ...verifyCodeResolver.Mutation,
    ...updateNotificationsResolver.Mutation,
  },
};

export default resolvers;
