import { FastifyReply, FastifyRequest } from 'fastify';
import { QrCodeCharge, serviceHeaders } from './baaS.schema';
import { generateQrCodeCharge } from './baaS.service';

export async function generateQrCodeChargeHandler(
  request: FastifyRequest<{
    Headers?: serviceHeaders;
    Body: QrCodeCharge;
  }>,
  reply: FastifyReply,
) {
  try {
    const qrCode = await generateQrCodeCharge(request.headers, {
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
