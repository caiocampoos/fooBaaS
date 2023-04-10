import { accessTokenResponse } from '@src/modules/baaS/baaS.schema';
import DockAuthClient from './dockAuthClient';
import { AxiosResponse } from 'axios';

class DockLogin {
  async execute() {
    const token = `${process.env.CARADHRAS_API_USERNAME}:${process.env.CARADHRAS_API_PASSWORD}`;
    const encodedToken = Buffer.from(token).toString('base64');
    const { data: response }: AxiosResponse<accessTokenResponse> =
      await DockAuthClient.post(
        '/oauth2/token?grant_type=client_credentials',
        {},
        {
          headers: {
            Authorization: `Basic ${encodedToken}`,
          },
        },
      );
    return (process.env['CARADHRAS_TOKEN'] = response.access_token);
  }
}

export default new DockLogin();
