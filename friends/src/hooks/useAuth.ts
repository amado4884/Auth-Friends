import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import useLocalStorage from "./useLocalStorage";
type loginReturn = {
  success: Boolean;
  error: string | null;
  token: string | null;
};

function useAuth(key: string, bearer = true) {
  const [token, setToken, removeToken] = useLocalStorage(key, null);

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `${bearer ? "Bearer: " : ""}${token}`,
    },
  };

  return {
    get: async function (url: string, configP?: AxiosRequestConfig | undefined): Promise<AxiosResponse> {
      try {
        return await axios.get(url, configP ? configP : config);
      } catch (err) {
        return err;
      }
    },
    post: async function (
      url: string,
      data?: any,
      configP?: AxiosRequestConfig | undefined
    ): Promise<AxiosResponse<any>> {
      try {
        return await axios.post(url, data ? data : null, configP ? configP : config);
      } catch (err) {
        return err;
      }
    },
    delete: async function (url: string, configP?: AxiosRequestConfig | undefined): Promise<AxiosResponse<any>> {
      try {
        return await axios.delete(url, configP ? configP : config);
      } catch (err) {
        return err;
      }
    },
    put: async function (
      url: string,
      data?: any,
      configP?: AxiosRequestConfig | undefined
    ): Promise<AxiosResponse<any>> {
      try {
        return await axios.put(url, data ? data : null, configP ? configP : config);
      } catch (err) {
        return err;
      }
    },
    patch: async function (
      url: string,
      data?: any,
      configP?: AxiosRequestConfig | undefined
    ): Promise<AxiosResponse<any>> {
      try {
        return await axios.patch(url, data ? data : null, configP ? configP : config);
      } catch (err) {
        return err;
      }
    },

    loggedIn: function () {
      return token ? true : false;
    },

    login: async function (
      loginUrl: string,
      data: any,
      callBack: (data: any) => string,
      configP?: AxiosRequestConfig | undefined
    ): Promise<loginReturn> {
      try {
        const response = await axios.post(loginUrl, data ? data : null, configP ? configP : config);
        const tokenResponse: string = callBack(response.data);

        if (tokenResponse) setToken(tokenResponse);

        return { success: true, error: null, token: tokenResponse };
      } catch (err) {
        return { success: false, error: err.message, token: null };
      }
    },

    logout: function () {
      removeToken();
    },
  };
}

export default useAuth;

export interface useAuthType {
  get: (url: string, configP?: AxiosRequestConfig | undefined) => Promise<AxiosResponse>;
  post: (url: string, data?: any, configP?: AxiosRequestConfig | undefined) => Promise<AxiosResponse<any>>;
  delete: (url: string, configP?: AxiosRequestConfig | undefined) => Promise<AxiosResponse<any>>;
  put: (url: string, data?: any, configP?: AxiosRequestConfig | undefined) => Promise<AxiosResponse<any>>;
  patch: (url: string, data?: any, configP?: AxiosRequestConfig | undefined) => Promise<AxiosResponse<any>>;
  loggedIn: () => boolean;
  login: (
    loginUrl: string,
    data: any,
    callBack: (data: any) => string,
    configP?: AxiosRequestConfig | undefined
  ) => Promise<loginReturn>;
  logout: () => void;
}
