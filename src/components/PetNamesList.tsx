import { useState, useMemo, useRef, useEffect } from 'react';
import namesData from '../data/names.json';

type PetNamesListProps = {
    selectedGender: string;
    selectedFilters: Record<string, string>;
    selectedLetter: string;
};

const PetNamesList = ({
    selectedGender,
    selectedFilters,
    selectedLetter,
}: PetNamesListProps) => {
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(
        null
    );
    const listRef = useRef<HTMLDivElement>(null);

    const filteredNames = useMemo(() => {
        return namesData.data.filter((name) => {
            // Filter by gender
            if (
                selectedGender &&
                !name.gender.includes(selectedGender.toUpperCase())
            ) {
                return false;
            }

            // Filter by category
            const selectedCategories = Object.values(selectedFilters).filter(
                (v) => v
            );
            if (selectedCategories.length > 0) {
                const hasCategory = selectedCategories.some((catId) =>
                    name.categories.includes(catId)
                );
                if (!hasCategory) return false;
            }

            // Filter by letter
            if (
                selectedLetter &&
                !name.title
                    .toLowerCase()
                    .startsWith(selectedLetter.toLowerCase())
            ) {
                return false;
            }

            return true;
        });
    }, [selectedGender, selectedFilters, selectedLetter]);

    // Set middle name as selected by default and scroll to it
    useEffect(() => {
        if (filteredNames.length > 0 && highlightedIndex === null) {
            const middleIndex = Math.floor(filteredNames.length / 2);
            // Scroll to the middle name after a short delay to ensure DOM is ready
            setTimeout(() => {
                const element = listRef.current?.querySelector(
                    `[data-index="${middleIndex}"]`
                );
                element?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }, 100);
        }
    }, [filteredNames, highlightedIndex]);

    const handleArrowUp = () => {
        if (highlightedIndex !== null && highlightedIndex > 0) {
            const newIndex = highlightedIndex - 1;
            setHighlightedIndex(newIndex);
            // Scroll to the new highlighted name
            const element = listRef.current?.querySelector(
                `[data-index="${newIndex}"]`
            );
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleArrowDown = () => {
        if (
            highlightedIndex !== null &&
            highlightedIndex < filteredNames.length - 1
        ) {
            const newIndex = highlightedIndex + 1;
            setHighlightedIndex(newIndex);
            // Scroll to the new highlighted name
            const element = listRef.current?.querySelector(
                `[data-index="${newIndex}"]`
            );
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const stripHtml = (html: string) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const selectedName =
        highlightedIndex !== null ? filteredNames[highlightedIndex] : null;

    return (
        <div className="rounded-lg p-4 mt-4 mx-32">
            <div className="flex gap-4">
                {/* Left side with arrows */}
                <div className="flex flex-col items-center justify-between py-4">
                    <button
                        onClick={handleArrowUp}
                        className="text-red-500 hover:text-red-700 transition-colors"
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
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleArrowDown}
                        className="text-red-500 hover:text-red-700 transition-colors"
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
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Center: Names list or empty state */}
                <div className="flex-1 border-gray-200 px-4">
                    {filteredNames.length > 0 ? (
                        <div
                            ref={listRef}
                            className="max-h-96 overflow-y-hidden"
                        >
                            <div className="space-y-2">
                                {filteredNames.map((name, index) => (
                                    <div
                                        key={name.id}
                                        data-index={index}
                                        onClick={() =>
                                            setHighlightedIndex(index)
                                        }
                                        className={`p-3 rounded cursor-pointer transition-colors ${
                                            highlightedIndex === index
                                                ? 'text-red-600 font-semibold text-xl'
                                                : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        {name.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96 relative">
                            <img
                                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                alt="Dog needing a name"
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-4xl font-bold text-white bg-black bg-opacity-50 px-6 py-3 rounded-lg">
                                    I NEED A NAME
                                </h2>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right side: Selected name description */}
                <div className="flex-1 pl-4">
                    {selectedName ? (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                {selectedName.title}
                            </h3>
                            <div className="border-t border-b border-gray-200 py-2">
                                <p className="text-sm text-gray-600 line-clamp-6">
                                    {stripHtml(selectedName.definition)}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-400">
                                Select a name to view description
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PetNamesList;
