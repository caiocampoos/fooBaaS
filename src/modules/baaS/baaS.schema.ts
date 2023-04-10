import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

///core models

const qrCodeCharge = z.object({
  idAccount: z.number(),
  key: z.string(),
  idTx: z.string(),
  finalAmount: z.number(),
  details: z.string(),
});

///Response Schemas

const accessTokenResponse = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

const qrCodeChargeResponse = z.object({
  emv: z.string(),
  text: z.string(),
  image: z.string(),
});

/// Types
export type qrCodeCharge = z.infer<typeof qrCodeCharge>;

export type qrCodeChargeApiResponse = z.infer<typeof qrCodeChargeResponse>;

export type accessTokenResponse = z.infer<typeof accessTokenResponse>;

/// Export ref for Beneficiary JsonSchemas

export const { schemas: baaSSchemas, $ref } = buildJsonSchemas(
  {
    qrCodeChargeResponse,
    qrCodeCharge,
    accessTokenResponse,
  },
  { $id: 'Charges' },
);
