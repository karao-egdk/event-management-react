import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import axios from "axios";
import { toast } from "sonner";
import { setUserToken } from "../lib/utils";

function Signup() {
    const navigate = useNavigate();
    const onSubmit = (values: { email: string; password: string }) => {
        axios
            .post(`${import.meta.env.VITE_BACKEND_AUTH_URL}/sign-up`, values, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                if (res.headers["token"]) {
                    setUserToken(res.headers["token"]);
                    toast("Signup!", {
                        description: "Account created successfully",
                    });

                    navigate("/events");
                }
                throw new Error("No token found");
            })
            .catch((error) => {
                console.error(error);
                toast("Error creating account!", {
                    description:
                        "There was an error creating account, please try again: " +
                        error?.response.data
                            ? error.response.data
                            : error?.message,
                });
            });
    };
    return <AuthForm submitForm={onSubmit} type="signup" />;
}

export default Signup;
