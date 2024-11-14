import axios from "axios";
import { AuthForm } from "../components/AuthForm";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setUserToken } from "../lib/utils";

function Login() {
    const navigate = useNavigate();
    const onSubmit = (values: { email: string; password: string }) => {
        axios
            .post(`${import.meta.env.VITE_BACKEND_AUTH_URL}/login`, values, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                if (res.headers["token"]) {
                    setUserToken(res.headers["token"]);
                    toast("Login!", {
                        description: "Successfully Logged in",
                    });

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
