import { createUserOrLoginUserResolver } from './createUserOrLoginUser';
import { verifyCodeResolver } from './verifyCode';
import { updateNotificationsResolver } from './updateNotifications';
import { updateExperienceInteractionResolver } from './updateExperienceInteraction';

export const resolvers = {
  Mutation: {
    ...createUserOrLoginUserResolver.Mutation,
    ...verifyCodeResolver.Mutation,
    ...updateNotificationsResolver.Mutation,
    ...updateExperienceInteractionResolver.Mutation,
  },
};

export default resolvers;
