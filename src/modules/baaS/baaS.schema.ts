import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

///core models

const qrCodeCharge = z.object({
  id: z.number(),
  key: z.string().nonempty(),
  amount: z.number().nonnegative(),
  uniqueIdentifier: z.string(),
  comment: z.string(),
  merchant: z.object({
    postalCode: z.string(),
    city: z.string(),
    type: z.number(),
    name: z.string(),
  }),
});

const dockqrCodeCharge = z.object({
  idAccount: z.number(),
  key: z.string(),
  idTx: z.string(),
  finalAmount: z.number(),
  details: z.string().nullish(),
});

const coincelrCodeCharge = z.object({
  key: z.string(),
  amount: z.number(),
  transactionIdentification: z.string(),
  merchant: z.object({
    postalCode: z.string(),
    city: z.string(),
    merchantCategoryCode: z.number(),
    name: z.string(),
  }),
  tags: z.string().array().nullish(),
  additionalInformation: z.string(),
  withdrawal: z.boolean().default(false),
});

const serviceHeaders = z.object({
  serviceprovider: z.string(),
});

///Response Schemas

const accessTokenResponse = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

const qrCodeResponse = z.object({
  emv: z.string(),
  text: z.string().nullish(),
  image: z.string().nullish(),
  transactionId: z.number().nullish(),
  uniqueIdentifier: z.string().nullish(),
});

const dockqrCodeResponse = z.object({
  emv: z.string(),
  text: z.string(),
  image: z.string(),
});

const coincelCodeResponse = z.object({
  transactionId: z.number(),
  emvqrcps: z.string(),
  transactionIdentifier: z.string(),
});

/// Exception Schemas
const dockidTxError = z.object({
  uuid: z.string().uuid(),
  message: z.string().default('Idx already in use'),
});

/// Types
export type QrCodeCharge = z.infer<typeof qrCodeCharge>;

export type DockqrCodeCharge = z.infer<typeof dockqrCodeCharge>;

export type CoincelrCodeCharge = z.infer<typeof coincelrCodeCharge>;

export type serviceHeaders = z.infer<typeof serviceHeaders>;

export type accessTokenResponse = z.infer<typeof accessTokenResponse>;

export type QrCodeResponse = z.infer<typeof qrCodeResponse>;

export type DockQrCodeResponse = z.infer<typeof dockqrCodeResponse>;

export type CoincelQrCodeResponse = z.infer<typeof coincelCodeResponse>;

/// Export ref for Beneficiary JsonSchemas

export const { schemas: baaSSchemas, $ref } = buildJsonSchemas(
  {
    qrCodeCharge,
    accessTokenResponse,
    qrCodeResponse,
    dockidTxError,
  },
  { $id: 'Charges' },
);
