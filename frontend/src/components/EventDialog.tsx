import React from "react";
import { nanoid } from "nanoid";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { cn } from "../lib/utils";
import { Calendar } from "../components/ui/calendar";
import useEvent from "../context/EventContext";
import { EventDetailsProp } from "../lib/interface";
import { Input } from "./ui/input";

function EventDialog({
    type,
    data,
    eventId,
}: {
    type: "edit" | "create";
    data?: { input: string; location: string; date: string };
    eventId?: string;
}) {
    const [date, setDate] = React.useState<Date | undefined>(
        data?.date ? new Date(data?.date) : undefined
    );
    const [input, setInput] = React.useState<{
        input: string;
        location: string;
    }>({
        input: data?.input || "",
        location: data?.location || "",
    });
    const { addEvent, updateEvent } = useEvent();

    const modifyEvent = () => {
        if (input.input === "" && input.location === "") return;

        if (date) {
            const event: EventDetailsProp = {
                title: input.input,
                location: input.location,
                date: date
                    .toLocaleString("fr-CA", { timeZone: "Asia/Kolkata" })
                    .substring(0, 10),
                budget: {
                    expenses: [],
                    income: [],
                },
                isEventDone: false,
                eventId: eventId === undefined ? nanoid() : eventId,
            };

            if (type === "create") {
                addEvent(event);
                setDate(undefined);
                setInput({
                    input: "",
                    location: "",
                });
            } else updateEvent(event);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {type === "create" ? (
                    <Button>Create new Event</Button>
                ) : (
                    <Button variant={'outline'}>
                        Edit Event
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {type === "create" ? "Create New Event" : "Edit Event"}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-4">
                    <label
                        className="text-sm font-semibold flex-1 text-end"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <Input
                        id="title"
                        className="flex-[2]"
                        type="text"
                        value={input.input}
                        onChange={(ev) =>
                            setInput({ ...input, input: ev.target.value })
                        }
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <p className="text-sm font-semibold flex-1 text-end">
                        Date
                    </p>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal border border-black/25 flex-[2]",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {date ? (
                                    format(date, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white dark:bg-black">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(date) => {
                                    setDate(date);
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-center space-x-4">
                    <label
                        className="text-sm font-semibold flex-1 text-end"
                        htmlFor="location"
                    >
                        Location
                    </label>
                    <Input
                        id="location"
                        className="flex-[2]"
                        type="text"
                        value={input.location}
                        onChange={(ev) =>
                            setInput({ ...input, location: ev.target.value })
                        }
                    />
                </div>
                <DialogClose asChild>
                    <Button
                        onClick={modifyEvent}
                        type="submit"
                        size="sm"
                        className="px-3"
                    >
                        {type === "create" ? "Create Event" : "Update Event"}
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}

export default EventDialog;
