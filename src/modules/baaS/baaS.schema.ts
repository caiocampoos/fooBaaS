import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

///Core Schemas

/////Static Qr Code Charges
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

const dockStaticQrCodeCharge = z.object({
  idAccount: z.number(),
  key: z.string(),
  idTx: z.string(),
  finalAmount: z.number(),
  details: z.string(),
});

const coincelStaticQrCodeCharge = z.object({
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

/////Dynamic Qr Code Charges
const dockqrLocImmedate = z.object({
  idAccount: z.number(),
  key: z.string(),
  locType: z.string().default('COB'),
  idTx: z.string(),
  payee: z.object({
    city: z.string(),
    state: z.string(),
    address: z.string(),
    zipCode: z.string(),
  }),
});

const dockDynamicImediateQrCodeCharge = z.object({
  idAccount: z.number(),
  loc: z.string().nullish(),
  payer: z.object({
    payerName: z.string(),
    beneficiaryType: z.enum(['F', 'J']),
    nationalRegistration: z.string(),
    payerQuestion: z.string(),
  }),
  amount: z.string(),
  allowChange: z.boolean().default(true),
  dateExpiration: z.string().datetime().nullish(),
  details: z
    .array(
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    )
    .optional(),
});

const coincelDynamicImediateQrCodeCharge = z.object({
  merchant: z.object({
    postalCode: z.string(),
    city: z.string(),
    name: z.string(),
  }),
  expiration: z.number().nullish(),
  clientRequestId: z.string(),
  key: z.string(),
  amount: z.string(),
  payerCPF: z.string(),
  payerName: z.string(),
});

const amountRegex = '\\d+(\\.|,)\\d{2}';
const DynamicImediateQrCodeCharge = z.object({
  id: z.number(),
  key: z.string(),
  amount: z
    .string({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount need to be of type xx.xx, Ex: 1.55 or 25.30',
    })
    .regex(new RegExp(amountRegex)),
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

////Commons
const serviceHeaders = z.object({
  serviceprovider: z.string(),
});

///Response Schemas

/////Static Qr Code Charges Responses
const StaticqrCodeResponse = z.object({
  emv: z.string(),
  text: z.string().nullish(),
  image: z.string().nullish(),
  transactionId: z.number().nullish(),
  uniqueIdentifier: z.string().nullish(),
});

const dockStaticqrCodeResponse = z.object({
  emv: z.string(),
  text: z.string(),
  image: z.string(),
});

const coincelStaticCodeResponse = z.object({
  transactionId: z.number(),
  emvqrcps: z.string(),
  transactionIdentifier: z.string(),
});

/////Dynamic Qr Code Charges Responses
const DynamicImmediateQrCodeResponse = z.object({
  emv: z.string(),
  text: z.string().nullish(),
  image: z.string().nullish(),
  transactionId: z.string().nullish(),
  uniqueIdentifier: z.string().nullish(),
  payloadURL: z.string().nullish(),
  createdDate: z.string().datetime().nullish(),
});

const dockDynamicImmediateCodeResponse = z.object({
  emv: z.string(),
  text: z.string(),
  image: z.string(),
  payloadURL: z.string(),
  idTx: z.string(),
  createdDate: z.string().datetime(),
});

const coincelDynamicImmediateCodeResponse = z.object({
  emvqrcps: z.string(),
  transactionId: z.string().nullish(),
  transactionIdentification: z.string(),
});

///commons
const accessTokenResponse = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

/// Types

/// Static Qr Code Charges
export type StaticQrCodeCharge = z.infer<typeof StaticQrCodeCharge>;

export type DockStatiQrCodeCharge = z.infer<typeof dockStaticQrCodeCharge>;

export type CoincelStaticQrCodeCharge = z.infer<
  typeof coincelStaticQrCodeCharge
>;

/// Dynamic Qr Code Charges
export type DockQrLocImmediate = z.infer<typeof dockqrLocImmedate>;

export type DynamicImmediateQrCodeCharge = z.infer<
  typeof DynamicImediateQrCodeCharge
>;

export type DockDynamiImmediatecCodeCharge = z.infer<
  typeof dockDynamicImediateQrCodeCharge
>;

export type CoincelDynamiImmediatecCodeCharge = z.infer<
  typeof coincelDynamicImediateQrCodeCharge
>;

/// Static Qr Code Responses

export type StaticQrCodeResponse = z.output<typeof StaticqrCodeResponse>;

export type DockStaticQrCodeResponse = z.output<
  typeof dockStaticqrCodeResponse
>;

export type CoincelStaticQrCodeResponse = z.output<
  typeof coincelStaticCodeResponse
>;

/// Dynamic Qr Code Responses
export type DynamicImmediateQrCodeResponse = z.output<
  typeof DynamicImmediateQrCodeResponse
>;

export type DockDynamicImmediateQrCodeResponse = z.output<
  typeof dockDynamicImmediateCodeResponse
>;

export type CoincelDynamicImmediateQrCodeResponse = z.output<
  typeof coincelDynamicImmediateCodeResponse
>;

///commons
export type AccessTokenResponse = z.output<typeof accessTokenResponse>;

export type ServiceHeaders = z.input<typeof serviceHeaders>;

/// Export ref for JsonSchemas

export const { schemas: baaSSchemas, $ref } = buildJsonSchemas(
  {
    StaticQrCodeCharge,
    StaticqrCodeResponse,
    DynamicImediateQrCodeCharge,
    DynamicImmediateQrCodeResponse,
  },
  { $id: 'Charges' },
);
