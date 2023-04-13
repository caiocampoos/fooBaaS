import {
  CoincelStaticQrCodeCharge,
  StaticQrCodeCharge,
  CoincelStaticQrCodeResponse,
  StaticQrCodeResponse,
  DynamicImmediateQrCodeCharge,
  CoincelDynamiImmediatecCodeCharge,
  CoincelDynamicImmediateQrCodeResponse,
  DynamicImmediateQrCodeResponse,
} from '../../modules/baaS/baaS.schema';

export const coincelStaticAdapter = (
  resp: StaticQrCodeCharge,
): CoincelStaticQrCodeCharge => ({
  key: resp.key,
  amount: resp.amount,
  transactionIdentification: resp.uniqueIdentifier,
  merchant: {
    postalCode: resp.merchant.postalCode,
    city: resp.merchant.city,
    merchantCategoryCode: resp.merchant.type,
    name: resp.merchant.name,
  },
  tags: undefined,
  additionalInformation: resp.comment,
  withdrawal: false,
});

export const coincelDynamicAdapter = (
  resp: DynamicImmediateQrCodeCharge,
): CoincelDynamiImmediatecCodeCharge => ({
  merchant: {
    postalCode: resp.merchant.postalCode,
    city: resp.merchant.city,
    name: resp.merchant.name,
  },
  expiration: undefined,
  clientRequestId: resp.uniqueIdentifier,
  key: resp.key,
  amount: resp.amount,
  payerCPF: resp.payer.document,
  payerName: resp.payer.name,
});

export const coincelStaticResponseAdapter = (
  resp: CoincelStaticQrCodeResponse,
): StaticQrCodeResponse => ({
  transactionId: resp.transactionId,
  emv: resp.emvqrcps,
  text: undefined,
  image: undefined,
  uniqueIdentifier: resp.transactionIdentifier,
});

export const dockDynamicImmediateResponseAdapter = (
  resp: CoincelDynamicImmediateQrCodeResponse,
): DynamicImmediateQrCodeResponse => ({
  emv: resp.emvqrcps,
  text: undefined,
  image: undefined,
  transactionId: resp.transactionId,
  uniqueIdentifier: undefined,
  payloadURL: undefined,
  createdDate: undefined,
});
