import axios from "axios";
import {
    EventContextInterface,
    EventDetailsProp,
    ReducerProps,
} from "../../lib/interface";

const addDataToLocalStorage = (allEvents: EventDetailsProp[]) => {
    localStorage.setItem("events", JSON.stringify(allEvents));
};

const getData = async (): Promise<EventDetailsProp[] | null> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}`);
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
            addDataToLocalStorage(updatedAllEvents.events);
            return updatedAllEvents;
        default:
            return state;
    }
};

export default eventReducer;
