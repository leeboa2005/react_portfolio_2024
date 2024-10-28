import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { gsap } from 'gsap';

const rotateAndShake = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(3deg); }
  50% { transform: rotate(-3deg); }
  75% { transform: rotate(1deg); }
`;

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
`;

const IntroContainer = styled.h1`
    padding: 7rem 0 2.8rem 0;
    display: flex;
    font-size: var(--font-title);
    font-family: var(--font-default-eng);
`;

const ImageWrapper = styled.div`
    width: 6.4rem;
    position: relative;
`;

const AnimatedImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: ${rotateAndShake} 2.5s ease-in-out infinite;
    position: absolute;
`;

const IntroSubContainer = styled.p`
    font-family: var(--font-default);
    width: 40rem;
    font-size: var(--font-text-large);
    color: #333;
    line-height: 1.3;
    margin-bottom: 1.6rem;
`;

const TabContainer = styled.div`
    width: 100%;
    max-width: var(--default-width);
    margin: 0 auto;
`;

const TabList = styled.div`
    display: flex;
    gap: 1.6rem;
    padding-bottom: 1.6rem;
`;

const TabButton = styled.label<{ $isChecked: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
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

const EmptyState = styled.div`
    text-align: center;
    padding: 4rem 0;
    color: var(--font-gray-color);
`;

const TabContent = styled.div`
    margin-top: 0.625rem;
    border-radius: 5px;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3.6rem 1.6rem;
    margin-bottom: 3.2rem;
`;

const GridItem = styled.div`
    width: 100%;
    height: 100%;

    h3 {
        padding: 1rem 0;
    }

    p {
        color: var(--font-gray-color);
        font-size: var(--font-text-small);
    }
`;

const ProjectImageContainer = styled.div`
    border-radius: var(--default-radius);
    overflow: hidden;
    width: 100%;
`;

const ProjectImage = styled.img`
    width: 100%;
    object-fit: cover;
`;

interface ProjectItem {
    title: string;
    description: string;
    image: string;
    techs: string[];
}

interface ContentData {
    [key: string]: ProjectItem[];
}

const Project: React.FC = () => {
    const [activeTab, setActiveTab] = useState('personal');
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);

    const tabData = [
        { id: 'personal', label: 'PERSONAL' },
        { id: 'team', label: 'TEAM' },
        { id: 'work', label: 'WORK' },
    ];

    const techFilters = ['React', 'Next.js', 'TypeScript', 'JavaScript'];

    const contentData: ContentData = {
        personal: [
            {
                title: 'HELLO, MONEY',
                description: '지출관리 및 시각화한 애플리케이션',
                image: '/project/personal_01.gif',
                techs: ['React', 'TypeScript'],
            },
            {
                title: 'FAVORITE COUNTRIES',
                description: '좋아하는 국가 리스트 만들기 웹사이트',
                image: '/project/personal_02.gif',
                techs: ['React', 'TypeScript'],
            },
            {
                title: 'POKEDEX',
                description: '포켓몬에 대해 알려주는 포켓몬 도감',
                image: '/project/personal_03.gif',
                techs: ['Next.js', 'TypeScript'],
            },
        ],
        team: [
            {
                title: '@GATHER_HERE',
                description: 'IT 직군 통합 플렛폼',
                image: '/project/team_01.png',
                techs: ['Next.js', 'TypeScript'],
            },
            {
                title: 'BIGBUN',
                description: '대전 빵집 추천 웹사이트',
                image: '/project/team_02.png',
                techs: ['Next.js', 'TypeScript'],
            },
            {
                title: 'ITFIT',
                description: 'IT 직종 테스트 플랫폼',
                image: '/project/team_03.png',
                techs: ['React', 'TypeScript'],
            },
        ],
        work: [
            {
                title: 'AMIPHARM',
                description: '생명과학 회사 웹사이트 제작',
                image: '/project/work_01.png',
                techs: ['JavaScript'],
            },
            {
                title: 'HANNAH',
                description: '한나패드 웹사이트 제작',
                image: '/project/work_02.png',
                techs: ['JavaScript'],
            },
            {
                title: 'GODOIL',
                description: '고도일 병원 웹사이트 유지보수',
                image: '/project/work_03.png',
                techs: ['JavaScript'],
            },
        ],
    };

    const toggleTech = (tech: string) => {
        setSelectedTechs((prev) => {
            const techIndex = prev.indexOf(tech);
            if (techIndex === -1) {
                return [...prev, tech];
            }
            const newTechs = [...prev];
            newTechs.splice(techIndex, 1);
            return newTechs;
        });
    };

    const filteredContent =
        contentData[activeTab]?.filter((item) => {
            if (selectedTechs.length === 0) return true;
            return item.techs.some((tech) =>
                selectedTechs.some((selectedTech) => selectedTech.toLowerCase() === tech.toLowerCase())
            );
        }) || [];

    useEffect(() => {
        gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });
        if (filteredContent.length > 0) {
            gsap.fromTo(itemsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 });
        }
    }, [activeTab, filteredContent.length]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setSelectedTechs([]);
    };

    return (
        <Wrap>
            <TabContainer>
                <IntroContainer>
                    MY PROJECT
                    <ImageWrapper>
                        <AnimatedImage src="/home/main_hat.png" alt="노트 이미지" />
                    </ImageWrapper>
                </IntroContainer>
                <IntroSubContainer>
                    다양한 웹 애플리케이션을 제작하기 위해
                    <br /> React, Next.js, TypeScript, JavaScript으로 만든 프로젝트입니다.
                </IntroSubContainer>
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
                <FilterList>
                    {techFilters.map((tech) => (
                        <FilterButton
                            key={tech}
                            $isSelected={selectedTechs.includes(tech)}
                            onClick={() => toggleTech(tech)}
                        >
                            {tech}
                        </FilterButton>
                    ))}
                </FilterList>
                <TabContent ref={contentRef}>
                    {filteredContent.length > 0 ? (
                        <GridContainer>
                            {filteredContent.map((item, index) => (
                                <GridItem key={index} ref={(el) => (itemsRef.current[index] = el!)}>
                                    <ProjectImageContainer>
                                        <ProjectImage src={item.image} alt={item.title} />
                                    </ProjectImageContainer>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </GridItem>
                            ))}
                        </GridContainer>
                    ) : (
                        <EmptyState>아직 준비 중인 프로젝트입니다...</EmptyState>
                    )}
                </TabContent>
            </TabContainer>
        </Wrap>
    );
};

export default Project;
