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
    defaultValue,
    ...rest
}: {
    label?: string;
    type?: HTMLInputElement["type"] | "textarea";
    name?: string;
    className?: string;
    rows?: number;
    error?: string;
    defaultValue?: string;
    [key: string]: any;

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
                    name={name}
                    defaultValue={defaultValue}
                    {...rest}
                />

            ) : (
                <input
                    id={name}
                    type={type}
                    name={name}
                    className={twMerge(
                        `border rounded px-3 py-2 w-full bg-white text-black mb-4 ${className}`
                    )}
                    defaultValue={defaultValue}
                    {...rest}
                />
            )}
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Input