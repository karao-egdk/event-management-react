import { Button } from "../components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import useEvent from "../context/EventContext";

function DeleteEventDialog({ id }: { id: string }) {
    const { deleteEvent } = useEvent();

    const deleteEv = () => {
        deleteEvent(id);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size={"icon"}
                    variant={"destructive"}
                    className="lg:opacity-0 lg:group-hover:opacity-100"
                >
                    <Trash2Icon />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to
                        permanently delete this Event?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={deleteEv} type="submit">
                            Confirm
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteEventDialog;
