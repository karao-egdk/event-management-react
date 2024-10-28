import { Button } from "./ui/button";

interface EventDetailsProp {
    eventId: string;
    title: string;
    date: string;
    location: string;
    isEventDone: boolean;
}

function EventCard({ eventDetails }: { eventDetails: EventDetailsProp }) {
    return (
        <div className="rounded-lg border shadow-sm sm:w-[25rem] p-4">
            <h2 className="text-md font-bold">{eventDetails.title}</h2>

            <div className="my-4">
                <p>Date: {eventDetails.date}</p>
                <p>Location: {eventDetails.location}</p>
            </div>
            <div className="sm:space-x-4 space-x-2">
                {eventDetails.isEventDone ? (
                    <p className="inline items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 w-fit bg-gray-100 text-black cursor-default">Done</p>
                ) : (
                    <p className="inline items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 w-fit bg-black text-white cursor-default">Upcoming</p>
                )}
                <Button className="bg-white text-black hover:bg-gray-100 border">Edit Event</Button>
                <Button className="bg-white text-black hover:bg-gray-100 border">View Budget</Button>
            </div>
        </div>
    );
}

export default EventCard;
