import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
};

type ButtonFilterProps = {
    name: string;
    active?: boolean;
    onClick?: () => void;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', active = false, ...props }, ref) => (
        <button
            ref={ref}
            className={`inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                active
                    ? 'border-red-500 bg-red-500 text-white'
                    : 'border-red-500 bg-white text-red-600 hover:bg-red-50'
            } ${className}`}
            {...props}
        />
    )
);

// Button.displayName = 'Button';

const ButtonFilter = ({ name, active = false, onClick }: ButtonFilterProps) => (
    <Button active={active} onClick={onClick}>
        {name}
    </Button>
);

export default ButtonFilter;
export { Button };
