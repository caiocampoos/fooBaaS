import HttpClient from '../http-client';

class DockPixBaaSClient extends HttpClient {
  public constructor() {
    super(`${process.env.CARADHRAS_PIX_BAAS_API_BASE_URL}`);
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers.Authorization = `${process.env.CARADHRAS_TOKEN}`;
      return config;
    });
  };

  public login = (path: string, config: object) =>
    this.instance.postForm(path, null, config);

  public post = (path: string, body: object) => this.instance.post(path, body);

  public get = (path: string) => this.instance.get(path);
}

export default new DockPixBaaSClient();
