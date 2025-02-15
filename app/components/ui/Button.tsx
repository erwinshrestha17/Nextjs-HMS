import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
    return (
        <button className={`px-4 py-2 rounded-lg transition ${className}`} {...props}>
            {children}
        </button>
    );
}
