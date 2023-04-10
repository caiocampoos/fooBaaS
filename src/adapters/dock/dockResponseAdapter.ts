import {
  DockQrCodeResponse,
  QrCodeResponse,
} from '../../modules/baaS/baaS.schema';

export const dockResponseAdapter = (
  resp: DockQrCodeResponse,
): QrCodeResponse => ({
  transactionId: undefined,
  emv: resp.emv,
  text: resp.text,
  image: resp.image,
  uniqueIdentifier: undefined,
});
