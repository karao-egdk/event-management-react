import { EventDetailsProp } from "../lib/interface";
import BudgetDialog from "./BudgetDialog";
import DeleteEventDialog from "./DeleteEventDialog";
import EventDialog from "./EventDialog";

function EventCard({ eventDetails }: { eventDetails: EventDetailsProp }) {
    const data = {
        input: eventDetails.title,
        location: eventDetails.location,
        date: eventDetails.date,
    };

    return (
        <div className="rounded-lg border dark:border-white/25 shadow-sm sm:w-[25rem] p-4 group">
            <div className="flex justify-between w-full items-center">
                <h2 className="text-md font-bold">{eventDetails.title}</h2>
                <DeleteEventDialog id={eventDetails.eventId} />
            </div>

            <div className="my-4">
                <p>Date: {eventDetails.date}</p>
                <p>Location: {eventDetails.location}</p>
            </div>
            <div className="sm:space-x-4 space-x-2">
                {new Date(eventDetails.date) < new Date() ? (
                    <p className="inline items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 w-fit bg-gray-100 dark:bg-gray-800 dark:text-white text-black cursor-default">
                        Done
                    </p>
                ) : (
                    <p className="inline items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 w-fit bg-black dark:bg-white dark:text-black text-white cursor-default">
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
