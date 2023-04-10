import HttpClient from '../http-client';

class CaradhrasHttpClient extends HttpClient {
  public constructor() {
    super(`${process.env.CARADHRAS_API_BASE_URL}`);
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = async () => {
    const token = `${process.env.CARADHRAS_API_USERNAME}:${process.env.CARADHRAS_API_PASSWORD}`;
    const encodedToken = Buffer.from(token).toString('base64');
    this.instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Basic ${encodedToken}`;
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      return config;
    });
  };

  public post = (path: string, body: object, config: object) =>
    this.instance.post(path, body, config);

  public get = (path: string) => this.instance.get(path);
}

export default new CaradhrasHttpClient();
