import { Resource } from "sst";
import type { Router } from "./api";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

const client = createTRPCProxyClient<Router>({
  links: [
    httpBatchLink({
      url: Resource.Trpc.url,
    }),
  ],
});

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: await client.greet.query({ name: "Patrick Star" }),
    }),
  };
}
