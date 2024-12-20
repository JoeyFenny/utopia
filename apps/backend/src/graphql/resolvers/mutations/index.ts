import { createUserOrLoginUserResolver } from './createUserOrLoginUser';
import { verifyCodeResolver } from './verifyCode';
import { updateNotificationsResolver } from './updateNotifications';
import { updateExperienceInteractionResolver } from './updateExperienceInteraction';
import { createExperienceResolver } from './createExperience';

export const resolvers = {
  Mutation: {
    ...createUserOrLoginUserResolver.Mutation,
    ...verifyCodeResolver.Mutation,
    ...updateNotificationsResolver.Mutation,
    ...updateExperienceInteractionResolver.Mutation,
    ...createExperienceResolver.Mutation,
  },
};

export default resolvers;
