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
    padding: 9vw 0 3.5vw 0;
    display: flex;
    font-size: 7vw;
`;

const ImageWrapper = styled.div`
    width: 8vw;
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
    font-family: 'SUIT-Regular';
    width: 50vw;
    font-size: 1.6vw;
    color: #333;
    line-height: 1.3;
    margin-bottom: 2vw;
`;

const TabContainer = styled.div`
    width: 100%;
    max-width: 93vw;
    margin: 0 auto;
`;

const TabList = styled.div`
    display: flex;
    gap: 2vw;
    padding-bottom: 2vw;
`;

const TabButton = styled.label<{ $isChecked: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.5vw;
    cursor: pointer;
    font-family: 'Exo 2', sans-serif;
    font-size: 1.4vw;
    font-weight: 400;
    color: ${(props) => (props.$isChecked ? '#111' : '#a1a1a1')};
`;

const CheckboxInput = styled.input`
    display: none;
`;

const CustomCheckbox = styled.div<{ $isChecked: boolean }>`
    width: 1.2vw;
    height: 1.2vw;
    border-radius: 4px;
    border: 1px solid ${(props) => (props.$isChecked ? '#111' : '#a1a1a1')};
    background-color: ${(props) => (props.$isChecked ? '#111' : 'transparent')};
    transition: all 0.2s ease;
`;

const FilterList = styled.div`
    display: flex;
    gap: 1vw;
    padding-bottom: 3.5vw;
`;

const FilterButton = styled.button<{ $isSelected: boolean }>`
    padding: 8px 16px;
    border-radius: 12px;
    border: 1px solid ${(props) => (props.$isSelected ? '#111' : '#a1a1a1')};
    background-color: ${(props) => (props.$isSelected ? '#f5f5f5' : 'transparent')};
    color: ${(props) => (props.$isSelected ? '#111' : '#a1a1a1')};
    cursor: pointer;
    font-size: 1vw;
    font-weight: 400;
    transition: all 0.3s ease;

    &:hover {
        border-color: #111;
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 5vw 0;
    color: #a1a1a1;
    font-size: 1.2vw;
`;

const TabContent = styled.div`
    margin-top: 10px;
    padding: 0;
    border-radius: 5px;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2vw;
    margin-bottom: 4vw;
`;

const GridItem = styled.div`
    width: 100%;
    height: 100%;

    h3 {
        font-size: 1.3vw;
        padding: 1vw 0;
    }

    p {
        color: #a1a1a1;
        font-size: 0.9vw;
    }
`;

const ProjectImageContainer = styled.div`
    border-radius: 12px;
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
                techs: ['Next.js', 'TypeScript'],
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
                techs: ['Next.js', 'TypeScript'],
            },
        ],
        work: [
            {
                title: 'AMIPHARM',
                description: '생명과학 회사 웹사이트 제작',
                image: '/project/work_01.png',
                techs: ['Javascript'],
            },
            {
                title: 'HANNAH',
                description: '한나패드 웹사이트 제작',
                image: '/project/work_02.png',
                techs: ['Javascript'],
            },
            {
                title: 'GODOIL',
                description: '고도일 병원 웹사이트 유지보수',
                image: '/project/work_03.png',
                techs: ['Javascript'],
            },
        ],
    };

    const toggleTech = (tech: string) => {
        setSelectedTechs((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]));
    };

    const filteredContent =
        contentData[activeTab]?.filter(
            (item) => selectedTechs.length === 0 || selectedTechs.some((tech) => item.techs.includes(tech))
        ) || [];

    useEffect(() => {
        gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });
        if (filteredContent.length > 0) {
            gsap.fromTo(itemsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 });
        }
        setSelectedTechs([]);
    }, [activeTab, filteredContent.length]);

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
                                onChange={() => setActiveTab(tab.id)}
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
