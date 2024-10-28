import EventCard from "../components/EventCard";
import EventDialog from "../components/EventDialog";
import { EventDetailsProp } from "../lib/interface";

function EventManagement() {

    const eventDetails: EventDetailsProp[] = [
        {
            eventId: "",
            title: "Tech Conference 2023",
            date: "2023-09-15",
            location: "San Francisco, CA",
            isEventDone: true,
            budget: {
                expenses: [],
                income: [],
            }
        },
        {
            eventId: "",
            title: "Startup Networking Mixer",
            date: "2023-10-01",
            location: "New York, NY",
            isEventDone: true,
            budget: {
                expenses: [],
                income: [],
            }
        },
        {
            eventId: "",
            title: "Tech Conference 2023",
            date: "2024-10-31",
            location: "Grande hotel Mangalore",
            isEventDone: false,
            budget: {
                expenses: [],
                income: [],
            }
        },
    ];

    return (
        <section className="container mx-auto flex flex-col gap-5 py-10 px-2">
            <h1 className="text-3xl font-bold">Event Management</h1>
            <div className="flex justify-between items-center w-full">
                <input
                    type="search"
                    placeholder="Search for event"
                    className="flex h-10 w-1/2 rounded-md border border-black/25 bg-background px-3 py-2 text-sm focus:border-0"
                />
                <EventDialog />
            </div>

            <div className="grid gap-10 md:grid-cols-2 mx-auto">
                {eventDetails.map((event, index) => {
                    return <EventCard key={index} eventDetails={event} />;
                })}
            </div>
        </section>
    );
}

export default EventManagement;
