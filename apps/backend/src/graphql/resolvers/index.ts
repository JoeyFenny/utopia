import GraphQLJSON from 'graphql-type-json';
import { GraphQLScalarType, Kind } from 'graphql';
import { ValueNode } from 'graphql';
import { resolvers as queryResolvers } from './queries';
import { resolvers as mutationResolvers } from './mutations';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: unknown): string {
    if (!(value instanceof Date)) {
      throw new Error('GraphQL Date Scalar serializer expected a `Date` object');
    }
    return value.toISOString();
  },
  parseValue(value: unknown): Date {
    if (typeof value !== 'string') {
      throw new Error('GraphQL Date Scalar parser expected a `string`');
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }
    return date;
  },
  parseLiteral(ast: ValueNode): Date {
    if (ast.kind !== Kind.STRING) {
      throw new Error('GraphQL Date Scalar literal expected a string');
    }
    const date = new Date(ast.value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }
    return date;
  },
});

export const resolvers = {
  ...queryResolvers,
  ...mutationResolvers,
  JSON: GraphQLJSON,
  Date: dateScalar,
};

export default resolvers;
