export interface EventDetailsProp {
    eventId: string;
    title: string;
    date: string;
    location: string;
    isEventDone: boolean;
    budget: {
        income: Budget[];
        expenses: Budget[];
    };
}

export interface Budget {
    budgetId: string;
    description: string;
    amount: number;
}

export interface EventContextInterface {
    events: EventDetailsProp[];
}
interface Payload {
    events: EventDetailsProp[];
    updateStateType?: "editEvent" | "budgetSelected" | "isBudgetOpen";
}

export interface ReducerProps {
    type: string;
    payload: Payload;
}
