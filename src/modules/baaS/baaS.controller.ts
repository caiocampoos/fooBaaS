import { FastifyReply, FastifyRequest } from 'fastify';
import {
  DynamicCodeCharge,
  StaticQrCodeCharge,
  serviceHeaders,
} from './baaS.schema';
import {
  generateStaticQrCodeCharge,
  generateDynamicQrCodeCharge,
} from './baaS.service';

export async function generateStaticQrCodeChargeHandler(
  request: FastifyRequest<{
    Headers?: serviceHeaders;
    Body: StaticQrCodeCharge;
  }>,
  reply: FastifyReply,
) {
  try {
    const qrCode = await generateStaticQrCodeCharge(request.headers, {
      ...request.body,
    });
    reply.code(200).send(qrCode);
  } catch (error) {
    if (error.response?.data.code == 400) {
      return reply.code(400).send(error.response?.data);
    }
    return reply.code(400).send(error);
  }
}

export async function generateDynamicQrCodeChargeHandler(
  request: FastifyRequest<{
    Headers?: serviceHeaders;
    Body: DynamicCodeCharge;
  }>,
  reply: FastifyReply,
) {
  try {
    const qrCode = await generateDynamicQrCodeCharge(request.headers, {
      ...request.body,
    });
    reply.code(200).send(qrCode);
  } catch (error) {
    if (error.response?.data.code == 400) {
      return reply.code(400).send(error.response?.data);
    }
    return reply.code(400).send(error);
  }
}
