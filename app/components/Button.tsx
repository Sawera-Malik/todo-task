import { Spin } from "antd";
import React from "react";
import { twMerge } from 'tailwind-merge'


export default function Button({
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    onClick,
    children,
    loading = false,
    center = false,
}: {
    center?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    loading?: boolean;
    children?: React.ReactNode;
}) {
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:text-gray-400',
        secondary: 'bg-slate-700 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:text-gray-400',
        danger: 'bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:text-gray-400',
    };

    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            onClick={onClick}
            className={twMerge(
                `inline-flex items-center justify-${center ? 'center' : 'start'
                } rounded-md ${variants[variant] || ''
                } ${sizes[size] || ''} ${className}`
            )}
            disabled={disabled}
        >
            {loading && <Spin />}
            {children}
        </button>
    );
}
