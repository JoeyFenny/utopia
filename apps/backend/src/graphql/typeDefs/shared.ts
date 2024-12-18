import { gql } from 'apollo-server';

export const sharedSchema = gql`
  scalar JSON
  scalar DateTime

  type User {
    id: ID!
    email: String!
    emailVerified: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AuthResponse {
    success: Boolean!
    error: String
    user: User
    token: String
    isNewUser: Boolean
  }

  type Query {
    me: User
  }
`;
