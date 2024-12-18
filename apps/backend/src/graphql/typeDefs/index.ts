import { gql } from 'graphql-tag';
import { createUserOrLoginUserSchema } from '../resolvers/mutations/createUserOrLoginUser';
import { verifyCodeSchema } from '../resolvers/mutations/verifyCode';

import { sharedSchema } from './shared';

const typeDefs = gql`
  ${sharedSchema}
  ${createUserOrLoginUserSchema}
  ${verifyCodeSchema}
`;

export default typeDefs;
