import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";
import { getUserDetails, getUserToken, setUserToken } from "./utils";
import { AxiosRetryItems } from "./interface";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

const refreshRetryItemsQueue: AxiosRetryItems[] = [];

let isRefreshing = false;

const refreshToken = async (uuid: string, email: string) => {
    const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/refresh-token`,
        {
            uuid,
            email,
        }
    );
    return res.headers["token"] as string;
};

const onRequest = async (
    request: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
    const token = getUserToken();
    request.headers.token = token;

    return request;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(error);
    return Promise.reject(error);
};

const onResponseError = async (
    error: AxiosError
): Promise<void | AxiosError> => {
    const originalRequest = error.config!;

    if (error.response && error.response.status === 401) {
        if (!isRefreshing) {
            isRefreshing = true;

            try {
                const { email, uuid } = getUserDetails();
                const token = await refreshToken(uuid, email);
                setUserToken(token);

                if (error.config) error.config.headers["token"] = token;

                refreshRetryItemsQueue.forEach(
                    ({ config, resolve, reject }) => {
                        axiosInstance(config)
                            .then((res) => resolve(res))
                            .catch((err) => reject(err));
                    }
                );

                refreshRetryItemsQueue.length = 0;

                return axiosInstance(originalRequest);
            } catch (error) {
            } finally {
                isRefreshing = false;
            }
        }

        return new Promise<void>((resolve, reject) => {
            refreshRetryItemsQueue.push({
                config: originalRequest,
                resolve,
                reject,
            });
        });
    }

    return Promise.reject(error);
};

export function getAxiosInstance(): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(
        (response) => response,
        onResponseError
    );
    return axiosInstance;
}
