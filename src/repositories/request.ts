import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Server from "../config/constants/server";
import { ResponseError } from "../types";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  withAuth?: boolean;
  isFormData?: boolean;
}

export class RequestSingleton {
  private static instance = axios.create({
    baseURL: Server.baseUrl, // Replace with your API base URL
    timeout: 10000,
  });

  public config: CustomAxiosRequestConfig = {
    headers: {},
  };

  private cbSuccess?: <T = any>(data: T, headers: any) => void;
  private cbFailure?: (error: {
    message: string;
    status?: number;
    data?: any;
  }) => void;

  constructor(
    endpoint: string,
    method: string,
    defaults?: Partial<CustomAxiosRequestConfig>
  ) {
    this.config = {
      url: endpoint,
      method,
      withAuth: true,
      ...defaults,
    };
    this.addAuthHeader();
  }

  // === SETTERS ===

  public setAuth(auth: boolean): this {
    this.config.withAuth = auth;
    return this;
  }

  public setRouteParams(params: string): this {
    this.config.url = `${this.config.url?.replace(/\/+$/, "")}/${params.replace(
      /^\/+/,
      ""
    )}`;
    return this;
  }

  public setParams(params: Record<string, any> = {}): this {
    this.config.params = { ...this.config.params, ...params };
    return this;
  }

  public setHeaders(headers: Record<string, any>): this {
    this.config.headers = { ...this.config.headers, ...headers };
    return this;
  }

  public setBody(
    body: Record<string, any>,
    type: "json" | "formData" = "json",
    removeKeys: string[] = []
  ): this {
    this.config.data =
      type === "json"
        ? body
        : RequestSingleton.jsonToFormData(body, removeKeys);
    this.config.isFormData = type === "formData";
    return this;
  }

  public onSuccess(cb: <T = any>(data: T, headers: any) => void): this {
    this.cbSuccess = cb;
    return this;
  }

  public onFailure(
    cb: (
      error: { message: string; status?: number; data?: any } | ResponseError
    ) => void
  ): this {
    this.cbFailure = cb;
    return this;
  }

  // === CORE METHOD ===

  public async call(): Promise<void> {
    try {
      console.group("========= API Call Begins =========");
      console.log("Request Config: ", this.config);

      const response: AxiosResponse = await RequestSingleton.instance.request(
        this.config
      );

      // console.log("Response: ", response);
      this.cbSuccess?.(response?.data, response.headers);
    } catch (error: any) {
      const parsedError = {
        message:
          error.response?.data?.message || error.message || "Unknown error",
        status: error.response?.status,
        data: error.response?.data,
      };
      console.error("Error: ", parsedError);
      this.cbFailure?.(parsedError);
    } finally {
      console.groupEnd();
    }
  }

  // === STATIC UTILITIES ===

  private static jsonToFormData(
    jsonObject: Record<string, any>,
    removeKeys: string[] = []
  ): FormData {
    const formData = new FormData();
    Object.entries(jsonObject).forEach(([key, value]) => {
      if (value !== undefined && !removeKeys.includes(key)) {
        if (Array.isArray(value)) {
          value.forEach((val) => formData.append(`${key}[]`, val));
        } else {
          formData.append(key, value);
        }
      }
    });
    return formData;
  }

  private addAuthHeader(): void {
    const access_token = localStorage.getItem("access-token");
    if (access_token) {
      // let access_token = (token);
      this.config.headers = {
        ...this.config.headers,
        Authorization: `Bearer ${access_token}`,
      };
    }
  }

  // === QUICK CALL UTILITY ===

  public static call(
    endpoint: string,
    method: string,
    body?: Record<string, any>,
    headers?: Record<string, any>
  ) {
    return new RequestSingleton(endpoint, method)
      .setBody(body || {})
      .setHeaders(headers || {})
      .call();
  }
}

export const request = (endpoint: string, method: string): RequestSingleton =>
  new RequestSingleton(endpoint, method);
export default RequestSingleton;
