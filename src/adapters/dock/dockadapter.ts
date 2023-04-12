import {
  DockqrCodeCharge,
  StaticQrCodeCharge,
} from '../../modules/baaS/baaS.schema';

export const dockAdapter = (resp: StaticQrCodeCharge): DockqrCodeCharge => ({
  key: resp.key,
  idAccount: resp.id,
  idTx: resp.uniqueIdentifier,
  finalAmount: resp.amount,
  details: resp.comment,
});
