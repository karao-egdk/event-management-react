import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as jose from "jose";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isUserLoggedIn() {
    const userToken = localStorage.getItem("token");

    if (typeof userToken === "string") {
        return true;
    }

    return false;
}

export function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("uuid");
}

export function getUserToken() {
    return localStorage.getItem("token")!;
}

export function getUserDetails() {
    const email = localStorage.getItem("email")!;
    const uuid = localStorage.getItem("uuid")!;

    return { email, uuid };
}

export function setUserToken(token: string) {
    try {
        const claims = jose.decodeJwt(token);
        localStorage.setItem("token", token);
        localStorage.setItem("email", claims.sub!);
        localStorage.setItem("uuid", claims.uuid as string);
    } catch (error) {
        console.error(error);
    }
}
