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
    isInterested: Boolean!
    createdAt: Date!
  }

  type Experience {
    id: ID!
    name: String!
    bio: String!
    cost: Float!
    city: String!
    date: Date!
    carouselPhotos: [String!]!
    createdAt: Date!
    updatedAt: Date!
    interactions: [ExperienceInteraction!]!
  }

  type Query {
    me: User
    experiences: [Experience!]!
    experience(id: ID!): Experience
    feedExperiences: [Experience!]!
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
    createExperience(name: String!, bio: String!, cost: Float!, city: String!, date: Date!, carouselPhotos: [String!]!): Experience!
    updateExperienceInteraction(experienceId: ID!, isInterested: Boolean!): ExperienceInteraction!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

export default typeDefs;
