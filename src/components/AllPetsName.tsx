import { useLayoutEffect, useRef } from 'react';
import { ALL_PETS_NAME } from '@/utils/enums/app';
import lettersData from '../data/letters.json';

type AllPetsNameProps = {
    selectedLetter: string;
    onLetterChange: (letter: string) => void;
};

const AllPetsName = ({ selectedLetter, onLetterChange }: AllPetsNameProps) => {
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const indicator = indicatorRef.current;
        const container = containerRef.current;
        if (!indicator || !container) return;

        if (!selectedLetter) {
            indicator.style.opacity = '0';
            return;
        }

        const btn = buttonRefs.current[selectedLetter];
        if (!btn) return;

        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        indicator.style.left = `${btnRect.left - containerRect.left}px`;
        indicator.style.top = `${btnRect.top - containerRect.top}px`;
        indicator.style.width = `${btnRect.width}px`;
        indicator.style.height = `${btnRect.height}px`;
        indicator.style.opacity = '1';
    }, [selectedLetter]);

    return (
        <div className="rounded-lg p-4 mt-4 mx-auto max-w-max">
            <h2 className="text-lg font-semibold mb-6">{ALL_PETS_NAME}</h2>

            <div
                ref={containerRef}
                className="relative flex flex-wrap justify-center bg-white rounded-full p-2"
            >
                <div
                    ref={indicatorRef}
                    className="absolute bg-red-500 rounded-full transition-all duration-300 ease-in-out z-0 pointer-events-none opacity-0"
                />

                {lettersData.data.map((letter) => (
                    <button
                        key={letter}
                        ref={(el) => {
                            buttonRefs.current[letter] = el;
                        }}
                        onClick={() =>
                            onLetterChange(
                                selectedLetter === letter ? '' : letter
                            )
                        }
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${
                            selectedLetter === letter
                                ? 'text-white'
                                : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllPetsName;
