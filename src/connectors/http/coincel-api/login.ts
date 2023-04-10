import { accessTokenResponse } from '@src/modules/baaS/baaS.schema';
import { AxiosResponse } from 'axios';
import CoincelAuthClient from './coincelAuthClient';

class CoincelLogin {
  async execute() {
    const data = `-----011000010111000001101001\r\nContent-Disposition: form-data; name="client_id"\r\n\r\n${process.env.CELCOIN_CLIENT_ID}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="grant_type"\r\n\r\nclient_credentials\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="client_secret"\r\n\r\n${process.env.CELCOIN_CLIENT_SECRET}\r\n-----011000010111000001101001--\r\n\r\n`;
    const { data: response }: AxiosResponse<accessTokenResponse> =
      await CoincelAuthClient.post('/v5/token', data);
    return (process.env['CELCOIN_TOKEN'] = response.access_token);
  }
}

export default new CoincelLogin();
