import { ArrowRightIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

function Error() {
    return (
        <div className="max-w-screen-xl m-auto px-4 flex items-center md:px-8">
            <div className="max-w-lg mx-auto space-y-3 text-center">
                <h3 className="text-gray-800 text-4xl font-extrabold sm:text-5xl">
                    Page not found
                </h3>
                <p className="text-gray-600">
                    Sorry, the page you are looking for could not be found or
                    has been removed.
                </p>
                <Button variant={"ghost"} asChild>
                    <Link to="/">
                        Home <ArrowRightIcon />
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default Error;
