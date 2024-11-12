import { AuthForm } from "../components/AuthForm";

function Signup() {
    const onSubmit = (values: { email: string; password: string }) => {
        console.log(values);
    };
    return <AuthForm submitForm={onSubmit} type="signup" />;
}

export default Signup;
