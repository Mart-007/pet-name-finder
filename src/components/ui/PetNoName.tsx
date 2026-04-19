import Dog from '../../assets/img/dog.png';

type NoNameProps = {
    name: string;
};

const PetNoName = ({ name }: NoNameProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-96 relative w-full">
            <div className="absolute inset-0 flex items-center justify-center">
                <h2
                    className="text-7xl font-bold text-red-600 text-[7rem] text-center leading-tight max-w-lg
                               animate-in fade-in slide-in-from-top-4 duration-700 ease-in"
                >
                    {name}
                </h2>
            </div>
            <img
                src={Dog}
                alt="Dog needing a name"
                className="w-64 h-64 object-contain z-10 relative mt-30
                           animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in delay-300"
            />
        </div>
    );
};

export default PetNoName;
