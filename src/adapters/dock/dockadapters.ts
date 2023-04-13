import {
  DockStatiQrCodeCharge,
  StaticQrCodeCharge,
  DynamicImmediateQrCodeCharge,
  DockDynamiImmediatecCodeCharge,
  DockQrLocImmediate,
  DockStaticQrCodeResponse,
  StaticQrCodeResponse,
  DynamicImmediateQrCodeResponse,
  DockDynamicImmediateQrCodeResponse,
} from '../../modules/baaS/baaS.schema';

export const dockStaticAdapter = (
  resp: StaticQrCodeCharge,
): DockStatiQrCodeCharge => ({
  key: resp.key,
  idAccount: resp.id,
  idTx: resp.uniqueIdentifier,
  finalAmount: resp.amount,
  details: resp.comment,
});

export const dockImmediateQrCodeChargeAdapter = (
  resp: DynamicImmediateQrCodeCharge,
): DockDynamiImmediatecCodeCharge => ({
  idAccount: resp.id,
  loc: undefined,
  payer: {
    payerName: resp.payer.name,
    beneficiaryType: resp.payer.type,
    nationalRegistration: resp.payer.document,
    payerQuestion: resp.payer.comment,
  },
  amount: resp.amount,
  allowChange: true,
  dateExpiration: undefined,
});

export const dockLocImmediateQrCodeAdapter = (
  resp: DynamicImmediateQrCodeCharge,
): DockQrLocImmediate => ({
  idAccount: resp.id,
  key: resp.key,
  locType: 'COB',
  idTx: resp.uniqueIdentifier,
  payee: {
    city: resp.merchant.city,
    state: resp.merchant.state,
    address: resp.merchant.address,
    zipCode: resp.merchant.postalCode,
  },
});

export const dockStaticResponseAdapter = (
  resp: DockStaticQrCodeResponse,
): StaticQrCodeResponse => ({
  transactionId: undefined,
  emv: resp.emv,
  text: resp.text,
  image: resp.image,
  uniqueIdentifier: undefined,
});

export const dockDynamicImmediateResponseAdapter = (
  resp: DockDynamicImmediateQrCodeResponse,
): DynamicImmediateQrCodeResponse => ({
  emv: resp.emv,
  text: resp.text,
  image: resp.image,
  transactionId: undefined,
  uniqueIdentifier: resp.idTx,
  payloadURL: resp.payloadURL,
  createdDate: resp.createdDate,
});
