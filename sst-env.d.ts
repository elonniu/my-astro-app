import "sst"
declare module "sst" {
  export interface Resource {
    MyBucket: {
      name: string
      type: "sst.aws.Bucket"
    }
    Trpc: {
      name: string
      type: "sst.aws.Function"
      url: string
    }
  }
}
export {}