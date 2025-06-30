import { twMerge } from "tailwind-merge";

const Input = ({
    label,
    type = "text",
    placeholder,
    name,
    className,
    required = false,
    rows,
    error
}: {
    label?: string;
    type?: HTMLInputElement["type"] | "textarea";
    placeholder?: string | undefined;
    name?: string;
    className?: string;
    required?: boolean;
    rows?: number;
    error?: string
}) => {

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="block mb-1 text-sm font-medium text-black" htmlFor={name}>
                    {label}
                </label>
            )}
            {type === "textarea" ? (
                <textarea
                    className={twMerge(`border rounded px-3 py-2 w-full bg-white text-black ${className}`)}
                    id={name}
                    rows={rows}
                    placeholder={placeholder}
                    name={name}
                    required={required}
                />

            ) : (
                <input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    className={twMerge(
                        `border rounded px-3 py-2 w-full bg-white text-black ${className}`
                    )}
                />
            )}
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Input