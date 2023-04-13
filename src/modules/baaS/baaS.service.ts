import { AxiosResponse } from 'axios';
import Docklogin from '@src/connectors/http/dock-api/login';
import DockPixBaaSClient from '@src/connectors/http/dock-api/dockPixBaaSClient';

import CoincelLogin from '@src/connectors/http/coincel-api/login';
import CoincelPixBaaSClient from '@src/connectors/http/coincel-api/coincelPixBaaSClient';

import {
  coincelStaticAdapter,
  coincelDynamicAdapter,
  coincelStaticResponseAdapter,
} from '@src/adapters/coincel/coinceladapters';

import {
  dockStaticAdapter,
  dockStaticResponseAdapter,
  dockLocImmediateQrCodeAdapter,
  dockImmediateQrCodeChargeAdapter,
  dockDynamicImmediateResponseAdapter,
} from '@src/adapters/dock/dockadapters';

import {
  DockStatiQrCodeCharge,
  CoincelStaticQrCodeCharge,
  StaticQrCodeCharge,
  ServiceHeaders,
  DockStaticQrCodeResponse,
  CoincelStaticQrCodeResponse,
  DynamicImmediateQrCodeCharge,
  DockDynamicImmediateQrCodeResponse,
} from './baaS.schema';

export async function generateStaticQrCodeCharge(
  headers: ServiceHeaders,
  body: StaticQrCodeCharge,
) {
  if (headers.serviceprovider == 'dock') {
    await Docklogin.execute();
    const dockBody: DockStatiQrCodeCharge = dockStaticAdapter(body);
    const {
      data: StaticQrCodeCharge,
    }: AxiosResponse<DockStaticQrCodeResponse> = await DockPixBaaSClient.post(
      `/code/v1/static-code`,
      dockBody,
    );
    const qrResponse = dockStaticResponseAdapter(StaticQrCodeCharge);
    return qrResponse;
  }
  if (headers.serviceprovider == 'coincel') {
    await CoincelLogin.execute();
    const coincelBody: CoincelStaticQrCodeCharge = coincelStaticAdapter(body);
    const {
      data: StaticQrCodeCharge,
    }: AxiosResponse<CoincelStaticQrCodeResponse> =
      await CoincelPixBaaSClient.post('/pix/v1/brcode/static', coincelBody);
    const qrResponse = coincelStaticResponseAdapter(StaticQrCodeCharge);
    qrResponse.uniqueIdentifier = coincelBody.transactionIdentification;
    return qrResponse;
  }
}

export async function generateDynamicQrCodeCharge(
  headers: ServiceHeaders,
  body: DynamicImmediateQrCodeCharge,
) {
  if (headers.serviceprovider == 'dock') {
    await Docklogin.execute();
    const locBody = dockLocImmediateQrCodeAdapter(body);
    const { data: locCode } = await DockPixBaaSClient.post(
      `/code/v1/dynamic-code-loc`,
      locBody,
    );
    const dockCharge = dockImmediateQrCodeChargeAdapter(body);
    dockCharge.loc = locCode.loc;
    dockCharge.dateExpiration = '2023-08-06T22:00:00Z';
    const { data }: AxiosResponse<DockDynamicImmediateQrCodeResponse> =
      await DockPixBaaSClient.post(
        `/code/v1/dynamic-code-immediate`,
        dockCharge,
      );
    const dynamicQrcoderesp = dockDynamicImmediateResponseAdapter(data);
    return dynamicQrcoderesp;
  }
  if (headers.serviceprovider == 'coincel') {
    await CoincelLogin.execute();
    const coincelCharge = coincelDynamicAdapter(body);
    coincelCharge.expiration = 86400;
    const { data: StaticQrCodeCharge } = await CoincelPixBaaSClient.post(
      '/pix/v1/brcode/static',
      coincelCharge,
    );
    const dynamicQrcoderesp =
      dockDynamicImmediateResponseAdapter(StaticQrCodeCharge);
    return dynamicQrcoderesp;
  }
}
