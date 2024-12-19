import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar JSON
  scalar Date

  input EmailInput {
    email: String!
  }

  input VerifyCodeInput {
    email: String!
    code: String!
  }

  type User {
    id: ID!
    email: String!
    emailVerified: Boolean!
    notificationsEnabled: Boolean!
    name: String
    createdAt: Date!
    updatedAt: Date!
    experiences: [ExperienceInteraction!]!
  }

  type ExperienceInteraction {
    id: ID!
    userId: String!
    user: User!
    experienceId: String!
    experience: Experience!
    liked: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type Experience {
    id: ID!
    title: String!
    description: String!
    location: String!
    imageUrl: String!
    createdAt: Date!
    updatedAt: Date!
    interactions: [ExperienceInteraction!]!
  }

  type Query {
    me: User
    experiences: [Experience!]!
    experience(id: ID!): Experience
  }

  type AuthResponse {
    success: Boolean!
    error: String
    user: User
    isNewUser: Boolean!
  }

  type UpdateResponse {
    success: Boolean!
    error: String
    user: User
  }

  type Mutation {
    createUserOrLoginUser(input: EmailInput!): AuthResponse!
    verifyCode(input: VerifyCodeInput!): AuthPayload!
    updateNotifications(enabled: Boolean!): UpdateResponse!
    createExperience(title: String!, description: String!, location: String!, imageUrl: String!): Experience!
    updateExperienceInteraction(experienceId: ID!, liked: Boolean!): ExperienceInteraction!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

export default typeDefs;
