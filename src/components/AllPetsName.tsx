import lettersData from '../data/letters.json';

type AllPetsNameProps = {
    selectedLetter: string;
    onLetterChange: (letter: string) => void;
};

const AllPetsName = ({ selectedLetter, onLetterChange }: AllPetsNameProps) => {
    return (
        <div className="rounded-lg p-4 mt-4 mx-auto max-w-max">
            <h2 className="text-lg font-semibold mb-6">All pets name</h2>
            <div className="flex flex-wrap justify-center bg-white rounded-full p-2">
                {lettersData.data.map((letter) => (
                    <button
                        key={letter}
                        onClick={() =>
                            onLetterChange(
                                selectedLetter === letter ? '' : letter
                            )
                        }
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            selectedLetter === letter
                                ? 'bg-red-500 text-white border-red-500'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
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
