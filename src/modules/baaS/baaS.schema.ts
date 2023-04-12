import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

///core models

const StaticQrCodeCharge = z.object({
  id: z.number(),
  key: z.string(),
  amount: z.number(),
  uniqueIdentifier: z.string(),
  comment: z.string(),
  merchant: z.object({
    postalCode: z.string(),
    city: z.string(),
    type: z.number(),
    name: z.string(),
  }),
});

const StaticdockqrCodeCharge = z.object({
  idAccount: z.number(),
  key: z.string(),
  idTx: z.string(),
  finalAmount: z.number(),
  details: z.string(),
});

const StaticcoincelrCodeCharge = z.object({
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

const qrLocImmedate = z.object({
  id: z.number(),
  key: z.string(),
  locType: z.string().default('COB'),
  merchant: z.object({
    postalCode: z.string(),
    city: z.string(),
    type: z.number(),
    name: z.string(),
  }),
});
const DynamicImediateQrCodeCharge = z.object({
  id: z.number(),
  key: z.string(),
  amount: z.string(),
  uniqueIdentifier: z.string(),
  comment: z.string(),
  merchant: z.object({
    postalCode: z.string(),
    city: z.string(),
    state: z.string(),
    address: z.string(),
    type: z.number(),
    name: z.string(),
  }),
  payer: z.object({
    name: z.string(),
    type: z.enum(['F', 'J']),
    document: z.string(),
    comment: z.string(),
  }),
});

///Response Schemas

const accessTokenResponse = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

const StaticqrCodeResponse = z.object({
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

/// Types
export type StaticQrCodeCharge = z.infer<typeof StaticQrCodeCharge>;

export type DockqrCodeCharge = z.infer<typeof StaticdockqrCodeCharge>;

export type StaticCoincelrCodeCharge = z.infer<typeof StaticcoincelrCodeCharge>;

export type QrLocImmedate = z.infer<typeof qrLocImmedate>;

export type DynamicCodeCharge = z.infer<typeof DynamicImediateQrCodeCharge>;

export type serviceHeaders = z.infer<typeof serviceHeaders>;

export type accessTokenResponse = z.infer<typeof accessTokenResponse>;

export type StaticQrCodeResponse = z.infer<typeof StaticqrCodeResponse>;

export type DockQrCodeResponse = z.infer<typeof dockqrCodeResponse>;

export type CoincelQrCodeResponse = z.infer<typeof coincelCodeResponse>;

/// Export ref for Beneficiary JsonSchemas

export const { schemas: baaSSchemas, $ref } = buildJsonSchemas(
  {
    StaticQrCodeCharge,
    StaticqrCodeResponse,
  },
  { $id: 'Charges' },
);
