import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
`;

const TabContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

const TabList = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    padding: 100px 0 30px 0;
`;

const TabButton = styled.button`
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Exo 2', sans-serif;

    &:hover,
    &:focus {
        outline: none;
    }
`;

const TabIcon = styled.img`
    width: 50px;
    height: auto;
`;

const TabLabel = styled.span<{ isActive: boolean }>`
    padding: 8px 16px;
    border-radius: 12px;
    border: 1px solid ${(props) => (props.isActive ? '#111' : 'transparent')};
    background-color: ${(props) =>
        props.isActive
            ? props.children === 'Personal'
                ? '#FF6969'
                : props.children === 'Team'
                ? '#A887E7'
                : '#FCD547'
            : 'transparent'};
    color: #000;

    ${TabButton}:hover & {
        border: 1px solid #111;
        background-color: ${(props) =>
            props.children === 'Personal' ? '#FF6969' : props.children === 'Team' ? '#A887E7' : '#FCD547'};
    }
`;

const TabContent = styled.div`
    margin-top: 10px;
    padding: 0;
    border-radius: 5px;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const GridItem = styled.div`
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const ProjectImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
`;

const Project: React.FC = () => {
    const [activeTab, setActiveTab] = useState('personal');
    const contentRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);

    const tabData = [
        { id: 'personal', label: 'Personal' },
        { id: 'team', label: 'Team' },
        { id: 'work', label: 'Work' },
    ];

    const contentData = {
        personal: [
            { title: '개인 작업물 1', description: '설명 1', image: '/path/to/image1.jpg' },
            { title: '개인 작업물 2', description: '설명 2', image: '/path/to/image2.jpg' },
            { title: '개인 작업물 3', description: '설명 3', image: '/path/to/image3.jpg' },
            { title: '개인 작업물 4', description: '설명 4', image: '/path/to/image4.jpg' },
            { title: '개인 작업물 5', description: '설명 5', image: '/path/to/image5.jpg' },
            { title: '개인 작업물 6', description: '설명 6', image: '/path/to/image6.jpg' },
        ],
        team: [
            { title: '팀 작업물 1', description: '설명 1', image: '/path/to/team1.jpg' },
            { title: '팀 작업물 2', description: '설명 2', image: '/path/to/team2.jpg' },
            { title: '팀 작업물 3', description: '설명 3', image: '/path/to/team3.jpg' },
        ],
        work: [
            { title: '업무 작업물 1', description: '설명 1', image: '/path/to/work1.jpg' },
            { title: '업무 작업물 2', description: '설명 2', image: '/path/to/work2.jpg' },
            { title: '업무 작업물 3', description: '설명 3', image: '/path/to/work3.jpg' },
            { title: '업무 작업물 4', description: '설명 4', image: '/path/to/work4.jpg' },
        ],
    };

    useEffect(() => {
        gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });

        gsap.fromTo(itemsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 });
    }, [activeTab]);

    return (
        <Wrap>
            <TabContainer>
                <TabList>
                    {tabData.map((tab) => (
                        <TabButton key={tab.id} onClick={() => setActiveTab(tab.id)}>
                            <TabIcon
                                src={`/home/main_${tab.id === 'personal' ? '03' : tab.id === 'team' ? '07' : '01'}.png`}
                                alt={`${tab.label} icon`}
                            />
                            <TabLabel isActive={activeTab === tab.id}>{tab.label}</TabLabel>
                        </TabButton>
                    ))}
                </TabList>
                <TabContent ref={contentRef}>
                    <h2>{activeTab === 'personal' ? '개인' : activeTab === 'team' ? '팀' : '업무'} 작업물</h2>
                    <GridContainer>
                        {contentData[activeTab as keyof typeof contentData].map((item, index) => (
                            <GridItem key={index} ref={(el) => (itemsRef.current[index] = el!)}>
                                <ProjectImage src={item.image} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </GridItem>
                        ))}
                    </GridContainer>
                </TabContent>
            </TabContainer>
        </Wrap>
    );
};

export default Project;
