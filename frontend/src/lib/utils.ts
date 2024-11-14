import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function getUserToken() {
	return localStorage.getItem("token")!;
}

export function setUserToken(token: string) {
	localStorage.setItem("token", token);
}
