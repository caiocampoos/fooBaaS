import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

///core models

const qrCodeCharge = z.object({
  idAccount: z.number(),
  key: z.string(),
  idTx: z.string({
    required_error: 'idTx Required to generate Charge',
    invalid_type_error: 'Max 25 charachters',
  }),
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

/// Exception Schemas
const dockidTxError = z.object({
  uuid: z.string().uuid(),
  message: z.string().default('Idx already in use'),
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
    dockidTxError,
  },
  { $id: 'Charges' },
);
