import React from "react";
import EventCard from "../components/EventCard";
import EventDialog from "../components/EventDialog";
import useEvent from "../context/EventContext";
import { Input } from "../components/ui/input";
import { isUserLoggedIn } from "../lib/utils";
import { Navigate } from "react-router-dom";
import LogoutDropdown from "../components/LogoutDropdown";
import { ModeToggle } from "../components/mode-toggle";

function EventManagement() {
    if (!isUserLoggedIn()) {
        return <Navigate to="/login" />;
    }
    const [search, setSearch] = React.useState<string>("");
    const { events } = useEvent();

    const eventDetails =
        search === ""
            ? events
            : events.filter(
                  (event) =>
                      event.title
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                      event.location
                          .toLowerCase()
                          .includes(search.toLowerCase())
              );

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Event Management</h1>
                <div className="sm:space-x-2 space-x-0">
                    <ModeToggle />
                    <LogoutDropdown />
                </div>
            </div>
            <div className="flex gap-2 justify-between items-center w-full">
                <Input
                    type="search"
                    placeholder="Search for event"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <EventDialog type="create" />
            </div>
            {eventDetails.length === 0 ? (
                <h1 className="w-full text-center text-xl font-semibold">
                    No events created
                </h1>
            ) : (
                <div className="grid gap-10 md:grid-cols-2 mx-auto">
                    {eventDetails.map((event, index) => {
                        return <EventCard key={index} eventDetails={event} />;
                    })}
                </div>
            )}
        </>
    );
}

export default EventManagement;
