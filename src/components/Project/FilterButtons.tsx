import React from 'react';
import styled from 'styled-components';

const FilterList = styled.div`
    display: flex;
    gap: 0.8rem;
    padding-bottom: 2.8rem;
`;

const FilterButton = styled.button<{ $isSelected: boolean }>`
    padding: 0.5rem 1rem;
    border-radius: var(--default-radius);
    border: 1px solid ${(props) => (props.$isSelected ? '#111' : 'var(--font-gray-color)')};
    background-color: ${(props) => (props.$isSelected ? '#f5f5f5' : 'transparent')};
    color: ${(props) => (props.$isSelected ? '#111' : 'var(--font-gray-color)')};
    cursor: pointer;
    font-size: var(--font-text-small);
    font-weight: var(--font-weight-default);
    transition: all 0.3s ease;

    &:hover {
        border-color: #111;
    }
`;

interface FilterButtonsProps {
    techFilters: string[];
    selectedTechs: string[];
    setSelectedTechs: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ techFilters, selectedTechs, setSelectedTechs }) => {
    const toggleTech = (tech: string) => {
        setSelectedTechs((prev) => {
            const techIndex = prev.indexOf(tech);
            if (techIndex === -1) return [...prev, tech];
            const newTechs = [...prev];
            newTechs.splice(techIndex, 1);
            return newTechs;
        });
    };

    return (
        <FilterList>
            {techFilters.map((tech) => (
                <FilterButton key={tech} $isSelected={selectedTechs.includes(tech)} onClick={() => toggleTech(tech)}>
                    {tech}
                </FilterButton>
            ))}
        </FilterList>
    );
};

export default FilterButtons;
