import { typeDefs } from "./schema";
import { customerResolvers } from "./resolvers/customer";

export const resolvers = {
  Query: {
    ...customerResolvers.Query,
  },
  Mutation: {
    ...customerResolvers.Mutation,
  },
};

export { typeDefs };
