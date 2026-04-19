import * as React from 'react';

type DropdownOption = {
    label: string;
    value: string;
};

type DropdownFilterProps = {
    title: string;
    options: DropdownOption[];
    selectedValue?: string;
    onSelect: (value: string) => void;
    isOpen?: boolean;
    onToggle: () => void;
    isLast?: boolean;
};

const DropdownFilter: React.FC<DropdownFilterProps> = ({
    title,
    isOpen = false,
    onToggle,
}) => {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className={`flex items-center justify-between px-4 py-2 text-sm font-medium transition-colors cursor-pointer  ${
                    isOpen
                        ? 'border-t-red-500 border-l-red-500 border-r-red-500 border-b-0 text-red-700'
                        : `border-gray-300 bg-white text-gray-700 hover:bg-gray-50 `
                }`}
            >
                <span>{title}</span>
                <svg
                    className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
        </div>
    );
};

export default DropdownFilter;
