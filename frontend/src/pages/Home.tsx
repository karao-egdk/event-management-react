import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

function Home() {
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8 xl:flex">
            <div className="space-y-5 max-w-2xl mx-auto text-center xl:text-left">
                <h1 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
                    Create and view events
                </h1>
                <p className="max-w-xl mx-auto xl:mx-0">
                    Sed ut perspiciatis unde omnis iste natus voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque
                    ipsa quae.
                </p>
                <div className="items-center justify-center gap-x-3 space-x-3 sm:space-x-0 space-y-3 sm:flex sm:space-y-0 xl:justify-start">
                    <Button asChild>
                        <Link to="/events">View Events</Link>
                    </Button>
                    <Button variant={"outline"} asChild>
                        <Link to="/login">Login now</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
