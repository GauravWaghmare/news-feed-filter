import React, { useEffect, useState, type ChangeEvent } from "react"

import { Storage } from "@plasmohq/storage"

const storage = new Storage()

const OptionsIndex: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
        // Load saved options when component mounts
        storage.get('selectedOptions').then((savedOptions: string[] | undefined) => {
            if (savedOptions) {
                setSelectedOptions(savedOptions);
            }
        });
    }, []);

    const handleOptionChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const option = event.target.value;
        const newSelectedOptions = event.target.checked
            ? [...selectedOptions, option]
            : selectedOptions.filter(item => item !== option);

        setSelectedOptions(newSelectedOptions);

        // Save to storage
        await storage.set('selectedOptions', newSelectedOptions);
    };

    const options: string[] = [
        'Sports', 'Political', 'Health', 'Entertainment', 'Technology',
        'Travel', 'Food & Dining', 'Lifestyle', 'Education', 'Business'
    ];

    return (
        <div>
            <h1>Welcome to Feed Filter</h1>
            <h2>Select categories of tweets you want to exclude from your feed</h2>
            <form>
                {options.map((option, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="checkbox"
                                value={option}
                                checked={selectedOptions.includes(option)}
                                onChange={handleOptionChange}
                            />
                            {option}
                        </label>
                    </div>
                ))}
            </form>
            <p>Selected options: {selectedOptions.join(', ')}</p>
        </div>
    );
};


export default OptionsIndex