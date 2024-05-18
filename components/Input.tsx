import React, {forwardRef} from "react";
import {twMerge} from "tailwind-merge";

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>{}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    disabled,
    ...props
}, ref) => {
    return (
        <input
            type={type}
            className={twMerge('flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3' +
                ' text-sm placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50' +
                ' focus:outline-none focus:ring-2 focus:ring-neon-pink', className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
        />

    )
});

Input.displayName = "Input";

export default Input;