import React, { createContext, useReducer, useContext } from "react";
import eventReducer, { getData, initialState } from "./reducer/eventReducer";
import { Budget, EventDetailsProp } from "../lib/interface";
import { toast } from "sonner";
import { getUserToken, isUserLoggedIn } from "../lib/utils";
import { getAxiosInstance } from "../lib/interceptors";

const instance = getAxiosInstance();

interface ContextProps {
    events: EventDetailsProp[];
    addEvent: (event: EventDetailsProp) => void;
    updateEvent: (event: EventDetailsProp) => void;
    addBudget: (
        events: EventDetailsProp[],
        stateId: string | undefined,
        type: "expense" | "income",
        budget: Budget
    ) => void;
    deleteBudget: (
        id: string | undefined,
        events: EventDetailsProp[],
        stateId: string | undefined,
        type: "expense" | "income"
    ) => void;
    deleteEvent: (eventId: string) => void;
    updateState: () => void;
}

const createContextInitialState: ContextProps = {
    events: [],
    addEvent: () => {},
    updateEvent: () => {},
    addBudget: () => {},
    deleteBudget: () => {},
    deleteEvent: () => {},
    updateState: () => {},
};

const EventContext = createContext(createContextInitialState);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(eventReducer, initialState);

    const token = getUserToken();

    const updateState = async () => {
        if (isUserLoggedIn()) {
            const events = await getData();
            if (events !== null)
                dispatch({
                    type: "UPDATE_STATE",
                    payload: {
                        events,
                    },
                });
        }
    };

    const addEvent = async (event: EventDetailsProp) => {
        const events = state.events;

        try {
            const res = await instance.post("/events/add", event, {
                headers: {
                    token: token,
                },
            });

            if (res.status === 200) {
                events.push(event);

                dispatch({
                    type: "ADD_EVENT",
                    payload: {
                        events,
                    },
                });

                toast("Event created!", {
                    description: "Successfully Created",
                });
            }
        } catch (error) {
            console.error(error);
            toast("Error!", {
                description: "Error occured, please try again later",
            });
        }
    };

    const updateEvent = async (event: EventDetailsProp) => {
        try {
            const res = await instance.put("/events/update", event);

            if (res.status === 200) {
                const updatedEvents = state.events.map((ev) => {
                    if (ev.eventId === event.eventId) {
                        const newEv = {
                            ...ev,
                            title: event.title,
                            location: event.location,
                            date: event.date,
                        };
                        return newEv;
                    }
                    return ev;
                });

                dispatch({
                    type: "EDIT_EVENT",
                    payload: {
                        events: updatedEvents,
                    },
                });

                toast("Event Updated!", {
                    description: "Successfully Updated your event",
                });
            }
        } catch (error) {
            console.error(error);
            toast("Error!", {
                description: "Error occured, please try again later",
            });
        }
    };

    const deleteEvent = async (eventId: string) => {
        const events = state.events;

        try {
            const res = await instance.delete(`/events/delete/${eventId}`);

            if (res.status === 200) {
                const updatedEvents = events.filter(
                    (event) => event.eventId !== eventId
                );

                dispatch({
                    type: "DELETE_EVENT",
                    payload: {
                        events: updatedEvents,
                    },
                });

                toast("Event deleted", {
                    description: "Event was successfully deleted",
                });
            }
        } catch (error) {
            console.error(error);
            toast("Error!", {
                description: "Error occured, please try again later",
            });
        }
    };

    const deleteBudget = async (
        id: string | undefined,
        events: EventDetailsProp[],
        stateId: string | undefined,
        type: "expense" | "income"
    ): Promise<void> => {
        if (!id && !stateId) return;

        try {
            await instance.delete(`/events/budget/delete/${id}`);

            toast("Budget deleted", {
                description: type + " was deleted successfully",
            });
        } catch (error) {
            console.error(error);
            toast("Budget Error", {
                description: "Couldn't delete data",
            });
            return;
        }

        let budget;
        let updatedEvents;

        if (type === "expense") {
            updatedEvents = [];
            updatedEvents = events.map((event) => {
                if (event.eventId === stateId) {
                    budget = event.budget.expenses.filter(
                        (expense) => expense.budgetId !== id
                    );

                    event.budget.expenses = budget;
                }
                return event;
            });
            dispatch({
                type: "DELETE_EXPENSE",
                payload: {
                    events: updatedEvents,
                },
            });
        } else {
            updatedEvents = [];
            updatedEvents = events.map((event) => {
                if (event.eventId === stateId) {
                    budget = event.budget.income.filter(
                        (expense) => expense.budgetId !== id
                    );

                    event.budget.income = budget;
                }
                return event;
            });
            dispatch({
                type: "DELETE_INCOME",
                payload: {
                    events: updatedEvents,
                },
            });
        }
    };

    const addBudget = async (
        events: EventDetailsProp[],
        stateId: string | undefined,
        type: "expense" | "income",
        budget: Budget
    ): Promise<void> => {
        if (!stateId) return;

        try {
            const createBudget = {
                amount: budget.amount,
                description: budget.description,
                id: budget.budgetId,
                eventId: stateId,
                type: type.toUpperCase(),
            };

            await instance.post(`/events/budget/add`, createBudget);

            toast("Budget added", {
                description: type + " was added successfully",
            });
        } catch (error) {
            console.error(error);
            toast("Budget Error", {
                description: "Couldn't add data",
            });
            return;
        }

        let updatedEvents;

        if (type === "expense") {
            updatedEvents = [];
            updatedEvents = events.map((event) => {
                if (event.eventId === stateId) {
                    if (budget) {
                        event.budget.expenses.push(budget);
                    }
                }
                return event;
            });

            dispatch({
                type: "ADD_EXPENSE",
                payload: {
                    events: updatedEvents,
                },
            });
        } else {
            updatedEvents = [];
            updatedEvents = events.map((event) => {
                if (event.eventId === stateId) {
                    if (budget) event.budget.income.push(budget);
                }
                return event;
            });
            dispatch({
                type: "ADD_INCOME",
                payload: {
                    events: updatedEvents,
                },
            });
        }
    };

    const value = {
        events: state.events,
        addEvent,
        updateEvent,
        addBudget,
        deleteBudget,
        deleteEvent,
        updateState,
    };

    return (
        <EventContext.Provider value={value}>{children}</EventContext.Provider>
    );
};

const useEvent = () => {
    const context = useContext(EventContext);

    if (context === undefined)
        throw new Error("Should be used within EventContext");

    return context;
};

export default useEvent;
