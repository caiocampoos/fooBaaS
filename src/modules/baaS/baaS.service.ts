import { AxiosResponse } from 'axios';
import login from '@src/connectors/http/caradhras-api/login';
import caradhrasPixBaaSClient from '@src/connectors/http/caradhras-api/caradhrasPixBaaSClient';
import { qrCodeCharge, qrCodeChargeApiResponse } from './baaS.schema';

export async function generateQrCodeCharge(body: qrCodeCharge) {
  await login.execute();
  const { data: qrCodeCharge }: AxiosResponse<qrCodeChargeApiResponse> =
    await caradhrasPixBaaSClient.post(`/code/v1/static-code`, body);
  return qrCodeCharge;
}
