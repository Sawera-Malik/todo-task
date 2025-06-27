type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string
}

const Input: React.FC<Props> = ({ label, ...props }) => {
    return (
        <div>
            {label && <label className="block mb-1 text-sm font-medium text-black" htmlFor={props.id}>{label}</label>}
            <input className="border rounded px-3 py-2 w-full bg-white text-black" {...props} />
        </div>
    )
}

export default Input