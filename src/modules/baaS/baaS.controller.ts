import { FastifyRequest } from 'fastify';
import { qrCodeCharge } from './baaS.schema';
import { generateQrCodeCharge } from './baaS.service';

export async function getContractHandler(
  request: FastifyRequest<{
    Body: qrCodeCharge;
  }>,
) {
  try {
    const qrCodeCharge = await generateQrCodeCharge({
      ...request.body,
    });
    return qrCodeCharge;
  } catch (e) {
    console.log(e);
  }
}
