import { FastifyInstance } from 'fastify';
import { generateQrCodeChargeHandler } from './baaS.controller';
import { $ref } from './baaS.schema';

async function baaSRoutes(server: FastifyInstance) {
  server.post(
    '/qrCode',
    {
      schema: {
        body: $ref('qrCodeCharge'),
        response: {
          200: $ref('qrCodeChargeResponse'),
          400: $ref('dockidTxError'),
        },
      },
    },
    generateQrCodeChargeHandler,
  );
}
export default baaSRoutes;
