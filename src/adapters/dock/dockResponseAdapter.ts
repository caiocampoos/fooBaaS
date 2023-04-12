import {
  DockQrCodeResponse,
  StaticQrCodeResponse,
} from '../../modules/baaS/baaS.schema';

export const dockResponseAdapter = (
  resp: DockQrCodeResponse,
): StaticQrCodeResponse => ({
  transactionId: undefined,
  emv: resp.emv,
  text: resp.text,
  image: resp.image,
  uniqueIdentifier: undefined,
});
