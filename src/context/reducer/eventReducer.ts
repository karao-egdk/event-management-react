import {
    EventContextInterface,
    EventDetailsProp,
    ReducerProps,
} from "../../lib/interface";

const addDataToLocalStorage = (allEvents: EventDetailsProp[]) => {
    localStorage.setItem("events", JSON.stringify(allEvents));
};

const getDataFromLocalStorage = (): EventDetailsProp[] | null => {
    const value = localStorage.getItem("events");

    if (typeof value === "string") {
        const parsedData: EventDetailsProp[] = JSON.parse(value);
        updateEventStatus(parsedData);
        return parsedData;
    }
    return null;
};

export const initialState: EventContextInterface = {
    events: getDataFromLocalStorage() || [],
};

const updateEventStatus = (events: EventDetailsProp[]) => {
    const updatedEvents = events.map((event) => {
        const updatedEvent = {
            ...event,
            isEventDone: new Date(event.date) < new Date() ? true : false,
        };
        return updatedEvent;
    });

    return updatedEvents;
};

const eventReducer = (
    state: EventContextInterface,
    action: ReducerProps
): EventContextInterface => {
    const { type, payload } = action;

    switch (type) {
        case "ADD_EVENT":
        case "EDIT_EVENT":
        case "ADD_EXPENSE":
        case "ADD_INCOME":
        case "DELETE_EXPENSE":
        case "DELETE_INCOME":
            const updatedAllEvents = {
                ...state,
                events: updateEventStatus(payload.events),
            };
            addDataToLocalStorage(updatedAllEvents.events);
            return updatedAllEvents;
        default:
            return state;
    }
};

export default eventReducer;
