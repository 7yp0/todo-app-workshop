// @flow

type Config = {
  version: string,
  port: number,
  env: string,
  graphqlUrl: string,
};

const config: Config = {
  version: String(process.env.npm_package_version),
  port: 8000,
  env: String(process.env.NODE_ENV),
  graphqlUrl: String(process.env.GRAPHQL_URL),
};

export default config;
