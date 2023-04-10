import {
  CoincelQrCodeResponse,
  QrCodeResponse,
} from '../../modules/baaS/baaS.schema';

export const coincelResponseAdapter = (
  resp: CoincelQrCodeResponse,
): QrCodeResponse => ({
  transactionId: resp.transactionId,
  emv: resp.emvqrcps,
  text: undefined,
  image: undefined,
  uniqueIdentifier: resp.transactionIdentifier,
});
