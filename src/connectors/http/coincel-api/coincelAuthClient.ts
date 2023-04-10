import HttpClient from '../http-client';

class CoincelAuthClient extends HttpClient {
  public constructor() {
    super(`${process.env.CELCOIN_BASE_URL}`);
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers.Accept = 'application/json';
      config.headers['Content-Type'] =
        'multipart/form-data; boundary=---011000010111000001101001';
      return config;
    });
  };

  public post = (path: string, body: string) => this.instance.post(path, body);

  public get = (path: string) => this.instance.get(path);
}

export default new CoincelAuthClient();
