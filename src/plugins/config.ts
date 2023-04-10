import 'dotenv/config';
import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

export enum NodeEnv {
  development = 'development',
  test = 'test',
  production = 'production',
}

const ConfigSchema = Type.Strict(
  Type.Object({
    NODE_ENV: Type.Enum(NodeEnv),
    LOG_LEVEL: Type.String(),
    API_HOST: Type.String(),
    API_PORT: Type.String(),
    API_NAME: Type.String(),
    CARADHRAS_API_BASE_URL: Type.String(),
    CARADHRAS_API_USERNAME: Type.String(),
    CARADHRAS_API_PASSWORD: Type.String(),
    CELCOIN_CLIENT_ID: Type.String(),
    CELCOIN_CLIENT_SECRET: Type.String(),
    CELCOIN_BASE_URL: Type.String(),
  }),
);

export type Config = Static<typeof ConfigSchema>;

const configPlugin: FastifyPluginAsync = async (server) => {
  server.decorate('config', process.env);
};

declare module 'fastify' {
  interface FastifyInstance {
    config: Config;
  }
}

export default fp(configPlugin);
