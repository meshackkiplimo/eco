import { db } from "../../db";
import { customers } from "../../db/schema/customer";

export const customerResolvers = {
  Query: {
    customers: async () => {
      return await db.select().from(customers);
    },
  },

  Mutation: {
    createCustomer: async (_: any, args: { firstName: string; lastName: string; email: string }) => {
      const [newCustomer] = await db.insert(customers).values({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
      }).returning();
      return newCustomer;
    },
  },
};
