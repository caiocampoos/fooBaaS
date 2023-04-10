import { FastifyInstance } from 'fastify';
import { getContractHandler } from './baaS.controller';
import { $ref } from './baaS.schema';

async function baaSRoutes(server: FastifyInstance) {
  server.post(
    '/qrCode',
    {
      schema: {
        body: $ref('qrCodeCharge'),
        response: {
          200: $ref('qrCodeChargeResponse'),
        },
      },
    },
    getContractHandler,
  );
}
export default baaSRoutes;
