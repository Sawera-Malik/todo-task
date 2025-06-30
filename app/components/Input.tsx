import { twMerge } from "tailwind-merge";
import React from "react";

type DefaultInputProps = React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = ({
    label,
    type = "text",
    name,
    className,
    rows,
    error,
    ...rest
}: {
    label?: string;
    type?: HTMLInputElement["type"] | "textarea";
    name?: string;
    className?: string;
    rows?: number;
    error?: string
} & DefaultInputProps) => {

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="block mb-1 text-sm font-medium text-black" htmlFor={name}>
                    {label}
                </label>
            )}
            {type === "textarea" ? (
                <textarea
                    className={twMerge(`border rounded  px-3 py-2 w-full bg-white text-black mb-4 ${className}`)}
                    id={name}
                    rows={rows}
                    {...rest}
                />

            ) : (
                <input
                    id={name}
                    type={type}
                    className={twMerge(
                        `border rounded px-3 py-2 w-full bg-white text-black mb-4 ${className}`
                    )}
                    {...rest}
                />
            )}
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Input