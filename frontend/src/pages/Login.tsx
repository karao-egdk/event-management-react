import { AuthForm } from "../components/AuthForm";
import { toast } from "sonner";
import { useNavigate, Navigate } from "react-router-dom";
import { isUserLoggedIn, setUserToken } from "../lib/utils";
import useEvent from "../context/EventContext";
import { getAxiosInstance } from "../lib/interceptors";

const instance = getAxiosInstance();

function Login() {
    const navigate = useNavigate();
    const { updateState } = useEvent();

    if (isUserLoggedIn()) {
        return <Navigate to="/events" />;
    }

    const onSubmit = (values: { email: string; password: string }) => {
        instance
            .post("/auth/login", values, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                if (res.headers["token"]) {
                    setUserToken(res.headers["token"]);
                    toast("Login!", {
                        description: "Successfully Logged in",
                    });

                    updateState();

                    navigate("/events");
                } else throw new Error("No token found");
            })
            .catch((error) => {
                console.error(error);
                toast("Error logging in!", {
                    description:
                        "There was an error creating account, please try again: " +
                        error?.response.data
                            ? error.response.data
                            : error?.message,
                });
            });
    };
    return <AuthForm submitForm={onSubmit} type="login" />;
}

export default Login;
