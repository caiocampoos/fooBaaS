import { FastifyReply, FastifyRequest } from 'fastify';
import { qrCodeCharge } from './baaS.schema';
import { generateQrCodeCharge } from './baaS.service';

export async function generateQrCodeChargeHandler(
  request: FastifyRequest<{
    Body: qrCodeCharge;
  }>,
  reply: FastifyReply,
) {
  try {
    const qrCodeCharge = await generateQrCodeCharge({
      ...request.body,
    });
    reply.code(200).send(qrCodeCharge);
  } catch (error) {
    if (error.response?.data.message == 'idTx already in use') {
      return reply.code(400).send(error.response?.data);
    }
    return reply.code(400).send(error);
  }
}
