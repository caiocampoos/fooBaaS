import { DockqrCodeCharge, QrCodeCharge } from '../../modules/baaS/baaS.schema';

export const dockAdapter = (resp: QrCodeCharge): DockqrCodeCharge => ({
  key: resp.key,
  idAccount: resp.id,
  idTx: resp.uniqueIdentifier,
  finalAmount: resp.amount,
  details: resp.comment,
});
