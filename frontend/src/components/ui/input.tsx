import React from "react";
import { cn } from "../../lib/utils";

function Input({
    id,
    type,
    placeholder,
    value,
    onChange,
    className,
}: {
    id?: string;
    type: string;
    placeholder?: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}) {
    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={cn(
                "flex h-10 w-1/2 rounded-md border border-black/25 bg-background px-3 py-2 text-sm focus:border-0",
                className
            )}
        />
    );
}

export default Input;
