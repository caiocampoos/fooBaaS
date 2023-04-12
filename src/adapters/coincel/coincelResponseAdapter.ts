import {
  CoincelQrCodeResponse,
  StaticQrCodeResponse,
} from '../../modules/baaS/baaS.schema';

export const coincelResponseAdapter = (
  resp: CoincelQrCodeResponse,
): StaticQrCodeResponse => ({
  transactionId: resp.transactionId,
  emv: resp.emvqrcps,
  text: undefined,
  image: undefined,
  uniqueIdentifier: resp.transactionIdentifier,
});
