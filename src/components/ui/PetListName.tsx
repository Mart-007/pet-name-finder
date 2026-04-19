type FilteredName = {
    id: string;
    title: string;
    definition: string;
};

type ListNameProps = {
    listRef: React.RefObject<HTMLDivElement | null>;
    filteredNames: FilteredName[];
    highlightedIndex: number | null;
    setHighlightedIndex: (index: number) => void;
};

const PetListName = ({
    listRef,
    filteredNames,
    highlightedIndex,
    setHighlightedIndex,
}: ListNameProps) => {
    return (
        <div className="list-name flex-1 border-gray-200 px-4">
            <div ref={listRef} className="max-h-96 overflow-y-hidden">
                <div className="space-y-2">
                    {filteredNames.map((name, index) => (
                        <div
                            key={name.id}
                            data-index={index}
                            onClick={() => setHighlightedIndex(index)}
                            className={`p-3 rounded cursor-pointer transition-colors ${
                                highlightedIndex === index
                                    ? 'text-red-600 font-semibold text-[1.5rem]'
                                    : 'hover:bg-gray-50 text-gray-500'
                            }`}
                        >
                            {name.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PetListName;
