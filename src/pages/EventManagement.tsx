import EventCard from "../components/EventCard";
import Search from "../components/Search";
import { Button } from "../components/ui/button";

function EventManagement() {

    const eventDetails = {
        eventId: "",
        title: 'Tech Conference 2023',
        date: '2023-09-15',
        location: 'San Francisco, CA',
        isEventDone: false,
    }

    return (
        <section className="container mx-auto flex flex-col gap-5 py-10 px-2">
            <h1 className="text-3xl font-bold">Event Management</h1>
            <div className="flex justify-between items-center w-full">
                <Search />
                <Button>
                    Create New Event
                </Button>
            </div>

            <div className="grid gap-10 md:grid-cols-2 mx-auto">
                <EventCard eventDetails={eventDetails} />
                <EventCard eventDetails={eventDetails} />
                <EventCard eventDetails={eventDetails} />
                <EventCard eventDetails={eventDetails} />
                <EventCard eventDetails={eventDetails} />
            </div>
        </section>
    );
}

export default EventManagement;
