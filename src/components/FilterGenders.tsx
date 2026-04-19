import ButtonFilter from './ui/ButtonFilter';

type ButtonsProps = {
    selectedGender: string;
    onGenderChange: (gender: string) => void;
};

const FilterGenders = ({ selectedGender, onGenderChange }: ButtonsProps) => {
    return (
        <div className="flex flex-row items-center justify-center gap-4">
            <ButtonFilter
                name="Male"
                active={selectedGender === 'M'}
                onClick={() =>
                    onGenderChange(selectedGender === 'M' ? '' : 'M')
                }
            />
            <ButtonFilter
                name="Female"
                active={selectedGender === 'F'}
                onClick={() =>
                    onGenderChange(selectedGender === 'F' ? '' : 'F')
                }
            />
            <ButtonFilter
                name="Other"
                active={selectedGender === 'O'}
                onClick={() =>
                    onGenderChange(selectedGender === 'O' ? '' : 'O')
                }
            />
        </div>
    );
};

export default FilterGenders;
