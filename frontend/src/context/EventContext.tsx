import React, { createContext, useReducer, useContext } from "react";
import eventReducer, { initialState } from "./reducer/eventReducer";
import { Budget, EventDetailsProp } from "../lib/interface";
import axios from "axios";
import { toast } from "sonner";

interface ContextProps {
    events: EventDetailsProp[];
    addEvent: (event: EventDetailsProp) => void;
    updateEvent: (event: EventDetailsProp) => void;
    addBudget: (
        events: EventDetailsProp[],
        stateId: string | undefined,
        type: "expense" | "income",
        budget: Budget | undefined
    ) => void;
    deleteBudget: (
        id: string | undefined,
        events: EventDetailsProp[],
        stateId: string | undefined,
        type: "expense" | "income"
    ) => void;
    deleteEvent: (eventId: string) => void;
}

const createContextInitialState: ContextProps = {
    events: [],
    addEvent: () => {},
    updateEvent: () => {},
    addBudget: () => {},
    deleteBudget: () => {},
    deleteEvent: () => {},
};

const EventContext = createContext(createContextInitialState);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(eventReducer, initialState);

    const addEvent = async (event: EventDetailsProp) => {
        const events = state.events;

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/add`,
                event
            );

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
            toast("Error!", {
                description: "Error occured, please try again later",
            });
        }
    };

    const updateEvent = (event: EventDetailsProp) => {
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
    };

    const deleteEvent = (eventId: string) => {
        const events = state.events;

        const updatedEvents = events.filter(
            (event) => event.eventId !== eventId
        );

        dispatch({
            type: "DELETE_EVENT",
            payload: {
                events: updatedEvents,
            },
        });
    };

    const deleteBudget = (
        id: string | undefined,
        events: EventDetailsProp[],
        stateId: string | undefined,
        type: "expense" | "income"
    ): void => {
        if (!id && !stateId) return;
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

    const addBudget = (
        events: EventDetailsProp[],
        stateId: string | undefined,
        type: "expense" | "income",
        budget: Budget | undefined
    ): void => {
        if (!stateId) return;
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
