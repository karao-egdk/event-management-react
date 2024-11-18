import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getUserToken } from "./utils";

const onRequest = (
    request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
    if (request.url === "") {
        const token = getUserToken();
        request.headers.token = token;
    }

    return request;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(error);
    return Promise.reject(error);
};

export function setupInterceptorsTo(
    axiosInstance: AxiosInstance
): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    return axiosInstance;
}
