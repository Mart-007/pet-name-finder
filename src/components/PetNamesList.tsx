import { useState, useMemo, useRef, useEffect } from 'react';
import namesData from '../data/names.json';
import ArrowButton from './ui/ArrowButton';
import PetListName from './ui/PetListName';
import PetNameDescription from './ui/PetNameDescription';
import PetNoName from './ui/PetNoName';

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
            const hasNoSelectedGender = !name.gender.includes(
                selectedGender.toUpperCase()
            );
            if (selectedGender && hasNoSelectedGender) return false;

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

    const getRelatedNames = (currentName: (typeof namesData.data)[number]) => {
        const relatedByCategory = namesData.data.filter(
            (name) =>
                name.id !== currentName.id &&
                name.categories.some((categoryId) =>
                    currentName.categories.includes(categoryId)
                )
        );

        const sameLetterNames = namesData.data.filter(
            (name) =>
                name.id !== currentName.id &&
                name.title[0].toLowerCase() ===
                    currentName.title[0].toLowerCase()
        );

        const combined = [...relatedByCategory, ...sameLetterNames];
        const uniqueRelated = Array.from(
            new Map(combined.map((name) => [name.id, name])).values()
        );

        return uniqueRelated.slice(0, 3).map((name) => name.title);
    };

    const selectedName =
        highlightedIndex !== null ? filteredNames[highlightedIndex] : null;

    const relatedNames = selectedName ? getRelatedNames(selectedName) : [];

    return (
        <div className="rounded-lg p-4 mt-4 mx-32">
            {filteredNames.length > 0 ? (
                <div className="flex gap-4">
                    <div className="arrow-buttons flex flex-col items-center justify-between py-4">
                        <ArrowButton
                            direction="up"
                            onClick={handleArrowUp}
                            className="mb-2"
                        />
                        <ArrowButton
                            direction="down"
                            onClick={handleArrowDown}
                        />
                    </div>
                    <PetListName
                        listRef={listRef}
                        filteredNames={filteredNames}
                        highlightedIndex={highlightedIndex}
                        setHighlightedIndex={setHighlightedIndex}
                    />
                    <PetNameDescription
                        title={selectedName?.title || ''}
                        definition={selectedName?.definition || ''}
                        relatedNames={relatedNames}
                    />
                </div>
            ) : (
                <div className="flex justify-center">
                    <PetNoName name="I NEED A NAME" />
                </div>
            )}
        </div>
    );
};

export default PetNamesList;
