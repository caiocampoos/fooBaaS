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
  StaticCoincelrCodeCharge,
  StaticQrCodeCharge,
  serviceHeaders,
  DockQrCodeResponse,
  CoincelQrCodeResponse,
  DynamicCodeCharge,
} from './baaS.schema';

export async function generateStaticQrCodeCharge(
  headers: serviceHeaders,
  body: StaticQrCodeCharge,
) {
  if (headers.serviceprovider == 'dock') {
    await Docklogin.execute();
    const dockBody: DockqrCodeCharge = dockAdapter(body);
    const { data: StaticQrCodeCharge }: AxiosResponse<DockQrCodeResponse> =
      await DockPixBaaSClient.post(`/code/v1/static-code`, dockBody);
    const qrResponse = dockResponseAdapter(StaticQrCodeCharge);
    return qrResponse;
  }
  if (headers.serviceprovider == 'coincel') {
    await CoincelLogin.execute();
    const coincelBody: StaticCoincelrCodeCharge = coincelAdapter(body);
    const { data: StaticQrCodeCharge }: AxiosResponse<CoincelQrCodeResponse> =
      await CoincelPixBaaSClient.post('/pix/v1/brcode/static', coincelBody);
    const qrResponse = coincelResponseAdapter(StaticQrCodeCharge);
    qrResponse.uniqueIdentifier = coincelBody.transactionIdentification;
    return qrResponse;
  }
}

export async function generateDynamicQrCodeCharge(
  headers: serviceHeaders,
  body: DynamicCodeCharge,
) {
  if (headers.serviceprovider == 'dock') {
    await Docklogin.execute();
    const { data: locCode } = await DockPixBaaSClient.post(
      `/code/v1/dynamic-code-loc`,
      {
        idAccount: body.id,
        key: body.key,
        locType: 'COB',
        idTx: body.uniqueIdentifier,
        payee: {
          city: body.merchant.city,
          state: body.merchant.state,
          address: body.merchant.address,
          zipCode: body.merchant.postalCode,
        },
      },
    );
    const { data } = await DockPixBaaSClient.post(
      `/code/v1/dynamic-code-immediate`,
      {
        idAccount: body.id,
        loc: locCode.loc,
        payer: {
          payerName: body.payer.name,
          beneficiaryType: body.payer.type,
          nationalRegistration: body.payer.document,
          payerQuestion: body.payer.comment,
        },
        amount: body.amount,
        allowChange: true,
        dateExpiration: '2023-08-06T22:00:00Z',
        details: [
          {
            title: 'campo aberto',
            content: 'campo aberto',
          },
        ],
      },
    );
    console.log(data);
    return data;
  }
  if (headers.serviceprovider == 'coincel') {
    return 'Tea aquieta';
  }
}
