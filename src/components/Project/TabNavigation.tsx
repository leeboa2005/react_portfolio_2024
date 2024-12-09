import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 추가
import styled from 'styled-components';

const TabList = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.6rem;
    border-top: 1px solid #111;
    border-bottom: 1px solid #111;

    & > label:not(:last-child) {
        border-right: 1px solid #111;
    }
`;

const TabButton = styled.label<{ $isChecked: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1.4rem 0.8rem;
    font-family: var(--font-default-eng);
    font-size: var(--font-text);
    font-weight: var(--font-weight-default);
    color: ${(props) => (props.$isChecked ? '#111' : 'var(--font-gray-color)')};

    & > span {
        flex-grow: 1;
    }
`;

const CheckboxInput = styled.input`
    display: none;
`;

const CustomCheckbox = styled.div<{ $isChecked: boolean }>`
    flex-shrink: 0;
    width: 1.3rem;
    height: 1.3rem;
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
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 URL을 변경합니다.

    const tabData = [
        { id: 'personal', label: 'PERSONAL' },
        { id: 'team', label: 'TEAM' },
        { id: 'work', label: 'WORK' },
    ];
    const handleTabSelection = (tabId: string) => {
        handleTabChange(tabId);
        navigate(`/project/${tabId}`);
    };

    return (
        <TabList>
            {tabData.map((tab) => (
                <TabButton key={tab.id} $isChecked={activeTab === tab.id}>
                    <span>{tab.label}</span>
                    <CheckboxInput
                        type="radio"
                        name="tab"
                        id={tab.id}
                        checked={activeTab === tab.id}
                        onChange={() => handleTabSelection(tab.id)}
                    />
                    <CustomCheckbox $isChecked={activeTab === tab.id} />
                </TabButton>
            ))}
        </TabList>
    );
};

export default TabNavigation;
