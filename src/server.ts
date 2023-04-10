import fastify from 'fastify';
import swagger from '@fastify/swagger';
import cors from '@fastify/cors';
import { withRefResolver } from 'fastify-zod';
import swaggerUI from '@fastify/swagger-ui';
import config from './plugins/config';
import { baaSSchemas } from './modules/baaS/baaS.schema';
import baaSRoutes from './modules/baaS/baaS.routes';
declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
  }
}

const server = fastify({
  logger: {
    level: process.env.LOG_LEVEL,
  },
});

await server.register(config);
for (const schema of [...baaSSchemas]) {
  server.addSchema(schema);
}

await server.register(cors, { origin: '*' });

server.get('/', async function () {
  return { status: 'im OK!' };
});

server.register(
  swagger,
  withRefResolver({
    openapi: {
      info: {
        title: 'Woovi BaaS',
        description: 'Weird flex on Baas for Pix',
        version: '1.0.0',
      },
    },
  }),
);

server.register(swaggerUI, {
  routePrefix: '/docs',
  staticCSP: false,
});

await server.register(baaSRoutes, { prefix: 'baaS' });
await server.ready();
server.swagger();

export default server;
