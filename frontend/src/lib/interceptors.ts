import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { getUserDetails, getUserToken, setUserToken } from "./utils";
import * as jose from "jose";

const refreshToken = async (uuid: string, email: string) => {
    const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_AUTH_URL}/refresh-token`,
        {
            uuid,
            email,
        }
    );
    return res.headers["Token"] as string;
};

const onRequest = async (
    request: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
    const token = getUserToken();
    try {
        jose.decodeJwt(token);
    } catch (e) {
        console.log(e);
        const { email, uuid } = getUserDetails();
        const token = await refreshToken(uuid, email);
        setUserToken(token);
    }

    if (request.url === "") {
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
