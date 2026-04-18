import { useState } from 'react';
import DropdownFilter from './ui/DropdownFilter';
import categoriesData from '../data/categories.json';

type FiltersProps = {
    selectedFilters: Record<string, string>;
    onFiltersChange: (filters: Record<string, string>) => void;
};

const Filters = ({ selectedFilters, onFiltersChange }: FiltersProps) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const categoriesMap = new Map(
        categoriesData.data.map((cat) => [cat.id, cat.name])
    );

    const filterGroups = categoriesData.filterGroups.map((group) => ({
        id: group.id,
        label: group.label,
        options: group.categoryIds.map((id) => ({
            label: categoriesMap.get(id)!,
            value: id,
        })),
    }));

    const handleDropdownToggle = (dropdownName: string) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    const handleFilterSelect = (filterType: string, value: string) => {
        const newFilters = {
            ...selectedFilters,
            [filterType]: selectedFilters[filterType] === value ? '' : value,
        };
        onFiltersChange(newFilters);
    };

    return (
        <div className="w-full border-t border-b border-gray-300 relative bg-white">
            <div className="flex items-center justify-center">
                <span className="px-4 py-4 text-sm font-medium text-gray-700 border-r border-gray-300">
                    Filters:
                </span>
                <div className="flex">
                    {filterGroups.map((group, index) => (
                        <DropdownFilter
                            key={group.id}
                            title={group.label}
                            options={group.options}
                            selectedValue={selectedFilters[group.id] || ''}
                            onSelect={(value) =>
                                handleFilterSelect(group.id, value)
                            }
                            isOpen={openDropdown === group.id}
                            onToggle={() => handleDropdownToggle(group.id)}
                            isLast={index === filterGroups.length - 1}
                        />
                    ))}
                </div>
            </div>
            {openDropdown && (
                <div className="w-full bg-white">
                    <div className="flex pl-4">
                        {filterGroups
                            .find((g) => g.id === openDropdown)
                            ?.options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        handleFilterSelect(
                                            openDropdown,
                                            option.value
                                        );
                                    }}
                                    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50 ${
                                        selectedFilters[openDropdown] ===
                                        option.value
                                            ? ' text-red-700'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    <span
                                        className={`w-4 h-4 mr-3 border-2 rounded-sm flex items-center justify-center ${
                                            selectedFilters[openDropdown] ===
                                            option.value
                                                ? 'border-red-500 bg-red-500 text-white'
                                                : 'border-gray-300'
                                        }`}
                                    >
                                        {selectedFilters[openDropdown] ===
                                            option.value && '✓'}
                                    </span>
                                    {option.label}
                                </button>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filters;
