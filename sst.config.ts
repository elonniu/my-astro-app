/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "my-astro-app",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "ap-northeast-1",
          profile: "vp-global",
        },
      }
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("MyBucket", {
      public: false,
    });

    const trpc = new sst.aws.Function("Trpc", {
      url: true,
      handler: "api.handler",
    });

    const client = new sst.aws.Function("Client", {
      url: true,
      link: [trpc],
      handler: "client.handler",
    });

    const api = new sst.aws.ApiGatewayV2("MyApi");
    api.route("ANY /{proxy+}", "apigw.handler");

    const site = new sst.aws.Astro("MyWeb", {
      link: [bucket, trpc],
    });

    return {
      site: site.url,
      trpc: trpc.url,
      client: client.url,
    };
  },
});
