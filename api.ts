import { z } from "zod";
import {
  type APIGatewayEvent,
  awsLambdaRequestHandler,
  type CreateAWSLambdaContextOptions,
} from "@trpc/server/adapters/aws-lambda";
import { initTRPC } from "@trpc/server";

const t = initTRPC
  .context<CreateAWSLambdaContextOptions<APIGatewayEvent>>()
  .create();

const router = t.router({
  greet: t.procedure
    .input(z.object({ name: z.string(), age: z.number().default(1) }))
    .query(({ input }) => {
      console.log("input", input);
      return `Hello ${input.name}!`;
    }),
});

export type Router = typeof router;

export const handler = awsLambdaRequestHandler({
  router: router,
  createContext: (opts) => opts,
});
