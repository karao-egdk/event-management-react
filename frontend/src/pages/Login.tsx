import { AuthForm } from "../components/AuthForm";

function Login() {
    const onSubmit = (values: { email: string; password: string }) => {
      console.log(values)
    };
    return <AuthForm submitForm={onSubmit} type="login" />;
}

export default Login;
