import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: "This field cannot be empty.",
        })
        .email("Please enter a valid email."),
    password: z
        .string()
        .min(6, { message: "Password should have a min length of 6" }),
});

export function AuthForm({
    type,
    submitForm,
}: {
    type: "login" | "signup";
    submitForm: (values: z.infer<typeof formSchema>) => void;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        submitForm(values);
    }

    return (
        <Card className="mx-auto my-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">
                    {type === "login" ? "Login" : "Signup"}
                </CardTitle>
                <CardDescription>
                    Enter your details below to {type} to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="test@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {type === "login" ? "Login" : "Signup"}
                            </Button>
                        </div>
                        {type === "login" ? (
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="sign-up" className="underline">
                                    Sign up
                                </a>
                            </div>
                        ) : (
                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <a href="login" className="underline">
                                    Login
                                </a>
                            </div>
                        )}
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
