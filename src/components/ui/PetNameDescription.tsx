import { stripHtml } from '@/utils/helpers/pureFunctions';

type PetNameDescriptionProps = {
    title: string;
    definition: string;
    relatedNames?: string[];
};

const PetNameDescription = ({
    title,
    definition,
    relatedNames = [],
}: PetNameDescriptionProps) => {
    return (
        <div className="description flex-1 pl-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {title}
            </h3>
            <div className="border-t border-b border-gray-200 py-4">
                <p className="text-md text-gray-600 line-clamp-6">
                    {stripHtml(definition)}
                </p>
            </div>
            {relatedNames.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm font-medium tracking-wider text-gray-600 mb-1">
                        Related name:
                    </p>
                    <p className="text-sm text-gray-500">
                        {relatedNames.join(' - ')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PetNameDescription;
