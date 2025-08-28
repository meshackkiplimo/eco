import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface Customer {
  id: string;
  username: string;
  email: string;
  password: string;
}

const customers: Customer[] = []; // 🚨 Replace with DB later

const resolvers = {
  Query: {
    me: (_: any, __: any, { userId }: { userId: string }) => {
      return customers.find((c) => c.id === userId) || null;
    },
  },

  Mutation: {
    registerCustomer: async (_: any, { username, email, password }: any) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const customer = {
        id: String(customers.length + 1),
        username,
        email,
        password: hashedPassword,
      };
      customers.push(customer);

      const token = jwt.sign({ id: customer.id }, "SECRET_KEY", { expiresIn: "1h" });
      return { ...customer, token };
    },

    login: async (_: any, { email, password }: any) => {
      const customer = customers.find((c) => c.email === email);
      if (!customer) throw new Error("User not found");

      const valid = await bcrypt.compare(password, customer.password);
      if (!valid) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: customer.id }, "SECRET_KEY", { expiresIn: "1h" });
      return { ...customer, token };
    },
  },
};

export default resolvers;
