import "sst"
declare module "sst" {
  export interface Resource {
    Trpc: {
      name: string
      type: "sst.aws.Function"
      url: string
    }
    MyBucket: {
      name: string
      type: "sst.aws.Bucket"
    }
  }
}
export {}