type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string
}

const TextArea: React.FC<Props> = ({ label, ...props }) => {
    return (
        <div>
            {label && (
                <label
                    className="block mb-1 text-sm font-medium text-black"
                    htmlFor={props.id}
                >
                    {label}
                </label>
            )}
            <textarea
                className="border rounded px-3 py-2 w-full bg-white text-black"
                {...props}
                id={props.id || undefined}
                rows={9}
            />
        </div>
    );
}

export default TextArea