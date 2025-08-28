import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

import typeDefs from "./schema";
import resolvers from "./resolvers";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        try {
          if (token) {
            const decoded: any = jwt.verify(token, "SECRET_KEY");
            return { userId: decoded.id };
          }
        } catch (err) {
          console.log("Invalid token");
        }
        return {};
      },
    })
  );

  app.listen(4000, () => {
    console.log("🚀 Server running at http://localhost:4000/graphql");
  });
})();
