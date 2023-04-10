import { AxiosResponse } from 'axios';
import Docklogin from '@src/connectors/http/dock-api/login';
import DockPixBaaSClient from '@src/connectors/http/dock-api/dockPixBaaSClient';

import CoincelLogin from '@src/connectors/http/coincel-api/login';
import CoincelPixBaaSClient from '@src/connectors/http/coincel-api/coincelPixBaaSClient';

import { dockAdapter } from '@src/adapters/dock/dockadapter';
import { coincelAdapter } from '@src/adapters/coincel/coinceladapter';

import { dockResponseAdapter } from '@src/adapters/dock/dockResponseAdapter';
import { coincelResponseAdapter } from '@src/adapters/coincel/coincelResponseAdapter';
import {
  DockqrCodeCharge,
  CoincelrCodeCharge,
  QrCodeCharge,
  serviceHeaders,
  DockQrCodeResponse,
  CoincelQrCodeResponse,
} from './baaS.schema';

export async function generateQrCodeCharge(
  headers: serviceHeaders,
  body: QrCodeCharge,
) {
  if (headers.serviceprovider == 'dock') {
    await Docklogin.execute();
    const dockBody: DockqrCodeCharge = dockAdapter(body);
    const { data: qrCodeCharge }: AxiosResponse<DockQrCodeResponse> =
      await DockPixBaaSClient.post(`/code/v1/static-code`, dockBody);
    const qrResponse = dockResponseAdapter(qrCodeCharge);
    console.log(qrResponse);
    return qrResponse;
  }
  if (headers.serviceprovider == 'coincel') {
    await CoincelLogin.execute();
    const coincelBody: CoincelrCodeCharge = coincelAdapter(body);
    const { data: qrCodeCharge }: AxiosResponse<CoincelQrCodeResponse> =
      await CoincelPixBaaSClient.post('/pix/v1/brcode/static', coincelBody);
    const qrResponse = coincelResponseAdapter(qrCodeCharge);
    qrResponse.uniqueIdentifier = coincelBody.transactionIdentification;
    return qrResponse;
  }
}
