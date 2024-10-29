import React from 'react';
import styled from 'styled-components';

const TabList = styled.div`
    display: flex;
    gap: 1.6rem;
    padding-bottom: 1.6rem;
`;

const TabButton = styled.label<{ $isChecked: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-default-eng);
    font-size: var(--font-text);
    font-weight: var(--font-weight-default);
    color: ${(props) => (props.$isChecked ? '#111' : 'var(--font-gray-color)')};
`;

const CheckboxInput = styled.input`
    display: none;
`;

const CustomCheckbox = styled.div<{ $isChecked: boolean }>`
    width: 1rem;
    height: 1rem;
    border-radius: var(--default-radius-small);
    border: 1px solid ${(props) => (props.$isChecked ? '#111' : 'var(--font-gray-color)')};
    background-color: ${(props) => (props.$isChecked ? '#111' : 'transparent')};
    transition: all 0.2s ease;
`;

interface TabNavigationProps {
    activeTab: string;
    handleTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, handleTabChange }) => {
    const tabData = [
        { id: 'personal', label: 'PERSONAL' },
        { id: 'team', label: 'TEAM' },
        { id: 'work', label: 'WORK' },
    ];

    return (
        <TabList>
            {tabData.map((tab) => (
                <TabButton key={tab.id} $isChecked={activeTab === tab.id}>
                    <CheckboxInput
                        type="radio"
                        name="tab"
                        id={tab.id}
                        checked={activeTab === tab.id}
                        onChange={() => handleTabChange(tab.id)}
                    />
                    <CustomCheckbox $isChecked={activeTab === tab.id} />
                    {tab.label}
                </TabButton>
            ))}
        </TabList>
    );
};

export default TabNavigation;
