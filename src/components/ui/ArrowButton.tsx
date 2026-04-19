import * as React from 'react';

type ArrowButtonProps = {
    direction: 'up' | 'down';
    onClick: () => void;
    disabled?: boolean;
    className?: string;
};

const ArrowButton: React.FC<ArrowButtonProps> = ({
    direction,
    onClick,
    disabled = false,
    className = '',
}) => {
    const path = direction === 'up' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7';

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`text-red-500 hover:text-red-700 transition-colors cursor-pointer ${
                disabled ? 'opacity-40 cursor-not-allowed' : ''
            } ${className}`}
        >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={path}
                />
            </svg>
        </button>
    );
};

export default ArrowButton;
