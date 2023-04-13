import { FastifyInstance } from 'fastify';
import {
  generateStaticQrCodeChargeHandler,
  generateDynamicQrCodeChargeHandler,
} from './baaS.controller';
import { $ref } from './baaS.schema';

async function baaSRoutes(server: FastifyInstance) {
  server.post(
    '/qrCode/static',
    {
      schema: {
        body: $ref('StaticQrCodeCharge'),
        response: {
          200: $ref('StaticqrCodeResponse'),
        },
      },
    },
    generateStaticQrCodeChargeHandler,
  );
  server.post(
    '/qrCode/dynamic',
    {
      schema: {
        body: $ref('DynamicImediateQrCodeCharge'),
      },
    },
    generateDynamicQrCodeChargeHandler,
  );
}
export default baaSRoutes;
