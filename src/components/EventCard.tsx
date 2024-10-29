import { EventDetailsProp } from "../lib/interface";
import BudgetDialog from "./BudgetDialog";
import EventDialog from "./EventDialog";

function EventCard({ eventDetails }: { eventDetails: EventDetailsProp }) {
    const data = {
        input: eventDetails.title,
        location: eventDetails.location,
        date: eventDetails.date,
    };

    return (
        <div className="rounded-lg border shadow-sm sm:w-[25rem] p-4">
            <h2 className="text-md font-bold">{eventDetails.title}</h2>

            <div className="my-4">
                <p>Date: {eventDetails.date}</p>
                <p>Location: {eventDetails.location}</p>
            </div>
            <div className="sm:space-x-4 space-x-2">
                {eventDetails.isEventDone ? (
                    <p className="inline items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 w-fit bg-gray-100 text-black cursor-default">
                        Done
                    </p>
                ) : (
                    <p className="inline items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 w-fit bg-black text-white cursor-default">
                        Upcoming
                    </p>
                )}
                <EventDialog
                    type="edit"
                    data={data}
                    eventId={eventDetails.eventId}
                />
                <BudgetDialog eventId={eventDetails.eventId} />
            </div>
        </div>
    );
}

export default EventCard;
