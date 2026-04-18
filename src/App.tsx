import { useState } from 'react';
import {
    Buttons,
    Filters,
    Title,
    AllPetsName,
    PetNamesList,
} from './components';
import './assets/styles/app.css';

function App() {
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<
        Record<string, string>
    >({});
    const [selectedLetter, setSelectedLetter] = useState('');

    return (
        <div className="flex flex-col min-h-screen bg-[#f0f5f5]">
            <div className="header flex flex-col items-center justify-center py-4 gap-4">
                <Title />
                <Buttons
                    selectedGender={selectedGender}
                    onGenderChange={setSelectedGender}
                />
                <Filters
                    selectedFilters={selectedFilters}
                    onFiltersChange={setSelectedFilters}
                />
            </div>
            <div className="content">
                <AllPetsName
                    selectedLetter={selectedLetter}
                    onLetterChange={setSelectedLetter}
                />
                <PetNamesList
                    selectedGender={selectedGender}
                    selectedFilters={selectedFilters}
                    selectedLetter={selectedLetter}
                />
            </div>
        </div>
    );
}

export default App;
