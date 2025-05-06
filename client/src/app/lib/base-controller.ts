import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BaseRequest } from './base-request';
import queryString from 'query-string';

abstract class BaseController {
    protected api: AxiosInstance;

    constructor() {
        let baseURL = process.env.PUBLIC_API_URL;
        console.log(baseURL) // Use the base URL from .env
        if (!baseURL) {
            baseURL = "http://localhost:5000/api/";
            // throw new Error('Base URL is not defined in the environment variables.');
        }

        this.api = axios.create({
            baseURL: baseURL ?? "",
            timeout: 30000, // Timeout set to 30 seconds
        });
    }

    protected get = <TResponse>(url: string, request: BaseRequest = { version: '' }): Promise<TResponse> => {
        const { version, ...queryParams } = request;
        if (queryParams) {
            url += `?${queryString.stringify(queryParams)}`;
        }
        return this.execute('get', url, version);
    };;

    protected post = <TResponse>(url: string, request: BaseRequest, config?: AxiosRequestConfig): Promise<TResponse> => {
        const { version, ...data } = request;
        return this.execute('post', url, version, undefined, data, config);
    };

    protected put = <TResponse>(url: string, request: BaseRequest, config?: AxiosRequestConfig): Promise<TResponse> => {
        const { version, ...data } = request;
        return this.execute('put', url, version, undefined, data, config);
    };

    protected patch = <TResponse>(url: string, request: BaseRequest, config?: AxiosRequestConfig): Promise<TResponse> => {
        const { version, ...data } = request;
        return this.execute('patch', url, version, undefined, data, config);
    };

    protected remove = <TResponse>(url: string, version?: string, config?: AxiosRequestConfig): Promise<TResponse> => {
        return this.execute('delete', url, version, undefined, undefined, config);
    };


    private execute<TResponse>(
        method: 'get' | 'post' | 'put' | 'patch' | 'delete',
        url: string,
        version: string | undefined = undefined,
        params: Record<string, string> | undefined = undefined,
        data: unknown = undefined,
        config?: AxiosRequestConfig
    ): Promise<TResponse> {
        return new Promise<TResponse>((resolve, reject) => {
            this.api
                .request<TResponse>({
                    url,
                    method,
                    params: params ? new URLSearchParams(params) : undefined,
                    data,
                    headers: { Accept: version ? `application/json; version=${version}` : 'application/json' },
                    ...config,
                })
                .then((response) => resolve(response.data))
                .catch((error) => reject(error instanceof Error ? error : new Error(String(error))));
        });
    }
}

export default BaseController;