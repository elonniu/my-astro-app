import {initTRPC} from '@trpc/server';
import {z} from 'zod';

import {awsLambdaRequestHandler, type CreateAWSLambdaContextOptions} from '@trpc/server/adapters/aws-lambda';
import type {APIGatewayProxyEventV2} from 'aws-lambda';

export const t = initTRPC.create();


function createContext({
                           event,
                           context,
                       }: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) {
    return {
        context: context,
        event: event,
        apiVersion: (event as { version?: string }).version ?? '1.0',
        user: event.headers['x-user'],
    };
}

// no context
type Context = Awaited<ReturnType<typeof createContext>>;

const publicProcedure = t.procedure;

const appRouter = t.router({
    getUser: t.procedure
        .input(z.string())
        .query((opts) => {
            opts.input; // string
            return {opts: opts, name: 'Bilbo'};
        }),
    greet: publicProcedure
        // .input(z.string())
        .query((opts) => {
            opts.ctx.event.queryStringParameters;
            return opts;
        }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const handler = awsLambdaRequestHandler({
    router: appRouter,
    createContext,
})
