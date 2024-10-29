import {
    EventContextInterface,
    EventDetailsProp,
    ReducerProps,
} from "../../lib/interface";

const addDataToLocalStorage = (allEvents: EventDetailsProp[]) => {
    localStorage.setItem("events", JSON.stringify(allEvents));
};

const getDateFromLocalStorage = (): EventDetailsProp[] | null => {
    const value = localStorage.getItem("events");

    if (typeof value === "string") return JSON.parse(value);
    return null;
};

export const initialState: EventContextInterface = {
    events: getDateFromLocalStorage() || [],
};

const updateEventStatus = (events: EventDetailsProp[]) => {
    console.log(events);
    const updatedEvents = events.map((event) => {
        if (new Date(event.date) < new Date()) {
            const updatedEvent = {
                ...event,
                isEventDone: true,
            };
            return updatedEvent;
        } else {
            const updatedEvent = {
                ...event,
                isEventDone: false,
            };
            return updatedEvent;
        }
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
