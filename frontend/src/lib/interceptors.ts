import axios, {
    AxiosError,
    AxiosInstance,
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
    return res.headers["token"] as string;
};

const onRequest = async (
    request: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
    const token = getUserToken();
    try {
        const claims = jose.decodeJwt(token);
        const expiration = new Date(claims.exp! * 1000);
        const now = new Date();
        if (now > expiration) throw new Error("Expired")
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
