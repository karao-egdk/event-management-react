import axios from "axios";
import {
    EventContextInterface,
    EventDetailsProp,
    ReducerProps,
} from "../../lib/interface";
import { isUserLoggedIn } from "../../lib/utils";
import { setupInterceptorsTo } from "../../lib/interceptors";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const getData = async (): Promise<EventDetailsProp[] | null> => {
    if (!isUserLoggedIn()) return null;

    const instance = setupInterceptorsTo(axiosInstance);

    try {
        const res = await instance.get("");
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const initialState: EventContextInterface = {
    events: (await getData()) || [],
};

const eventReducer = (
    state: EventContextInterface,
    action: ReducerProps
): EventContextInterface => {
    const { type, payload } = action;

    switch (type) {
        case "UPDATE_STATE":
        case "ADD_EVENT":
        case "EDIT_EVENT":
        case "DELETE_EVENT":
        case "ADD_EXPENSE":
        case "ADD_INCOME":
        case "DELETE_EXPENSE":
        case "DELETE_INCOME":
            const updatedAllEvents = {
                ...state,
                events: payload.events,
            };
            return updatedAllEvents;
        default:
            return state;
    }
};

export default eventReducer;
