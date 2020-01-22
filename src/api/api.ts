import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {generateFormData} from "../utils";
export const API_HOST = 'https://uxcandy.com/~shapoval/test-task-backend/v2';

const api = axios.create({
    baseURL: API_HOST,
    timeout: 1000,
});
api.defaults.headers.post['Content-Type'] = "multipart/form-data";

addDeveloperNameInterceptor(api);
addErrorInterceptor(api);
addFormDataInterceptor(api);

function addDeveloperNameInterceptor(instance: AxiosInstance): number {
    return instance.interceptors.request.use((config) => {
        return {
            ...config,
            params: {
                ...config.params,
                developer: 'Ponayobi',
            }
        };
    });
}
function addFormDataInterceptor(instance: AxiosInstance): number {
    return instance.interceptors.request.use((config) => {
        if (config.method === 'post') {
            config.data = generateFormData(config.data);
        }
        return config;
    });
}
function addErrorInterceptor(instance: AxiosInstance): number {
    return instance.interceptors.response.use((response: AxiosResponse<ApiResponse>) => {
        let result: AxiosResponse = {
            ...response,
            data: response.data.message,
        };

        if (response.data.status === "error") {
            const message = typeof response.data.message === "string" ? response.data.message : "";
            const error: Error = new Error(message);

            return Promise.reject({
                ...error,
                config: result.config,
                request: result.request,
                response: result,
                isAxiosError: true,
                toJSON: function () {
                    return {
                        message: this.message,
                        name: this.name,
                        stack: this.stack,
                        config: this.config,
                        code: this.code
                    };
                }
            } as AxiosError);
        }
        return result;
    });
}

export type ApiStatus = "ok" | "error";

export interface ApiResponse<T = never> {
    status: ApiStatus;
    message?: T;
}

export function request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R> {
    return api.request(config);
}
