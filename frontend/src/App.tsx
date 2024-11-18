import "./App.css";
import { EventProvider } from "./context/EventContext";
import EventManagement from "./pages/EventManagement";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Error from "./pages/Error";
import { ThemeProvider } from "./components/theme-provider";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            errorElement: <Error />,
        },
        {
            path: "login",
            element: <Login />,
        },
        {
            path: "sign-up",
            element: <Signup />,
        },
        {
            path: "events",
            element: <EventManagement />,
        },
    ]);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <EventProvider>
                <Layout>
                    <RouterProvider router={router} />
                </Layout>
            </EventProvider>
        </ThemeProvider>
    );
}

export default App;
