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
    description: string;
    amount: number;
}
