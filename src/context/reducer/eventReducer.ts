import {
    EventContextInterface,
    EventDetailsProp,
    ReducerProps,
} from "../../lib/interface";

export const initialState: EventContextInterface = {
    events: [
        {
            eventId: "abc",
            title: "Tech Conference 2023",
            date: "2023-09-15",
            location: "San Francisco, CA",
            isEventDone: true,
            budget: {
                income: [
                    {
                        budgetId: "1",
                        description: "Ticket Sales",
                        amount: 5000,
                    },
                ],
                expenses: [
                    {
                        budgetId: "1",
                        description: "Venue Rental",
                        amount: 2000,
                    },
                    { budgetId: "2", description: "Catering", amount: 1000 },
                ],
            },
        },
        {
            eventId: "def",
            title: "Startup Networking Mixer",
            date: "2023-10-01",
            location: "New York, NY",
            isEventDone: true,
            budget: {
                expenses: [],
                income: [],
            },
        },
        {
            eventId: "444",
            title: "Tech Conference 2023",
            date: "2024-10-31",
            location: "Grande hotel Mangalore",
            isEventDone: false,
            budget: {
                expenses: [],
                income: [],
            },
        },
    ],
};

const updateEventStatus = (events: EventDetailsProp[]) => {
    console.log(events)
    const updatedEvents = events.map((event) => {
        if (new Date(event.date) < new Date()) {
            const updatedEvent = {
                ...event,
                isEventDone: true,
            };
            return updatedEvent;
        }
        else {
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
            return {
                ...state,
                events: updateEventStatus(payload.events),
            };
        case "EDIT_EVENT":
            return {
                ...state,
                events: updateEventStatus(payload.events),
            };
        case "ADD_EXPENSE":
            return {
                ...state,
                events: updateEventStatus(payload.events),
            };
        case "ADD_INCOME":
            return {
                ...state,
                events: updateEventStatus(payload.events),
            };
        case "DELETE_EXPENSE":
            return {
                ...state,
                events: updateEventStatus(payload.events),
            };
        case "DELETE_INCOME":
            return {
                ...state,
                events: updateEventStatus(payload.events),
            };
        default:
            return state;
    }
};

export default eventReducer;
