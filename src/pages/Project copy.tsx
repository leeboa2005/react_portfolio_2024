import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import TabNavigation from '../components/Project/TabNavigation';
import FilterButtons from '../components/Project/FilterButtons';
import GridContent from '../components/Project/GridContent';

const Wrap = styled.div`
    width: var(--default-width);
    height: 100%;
    margin: 0 auto;
    min-height: 100vh;
`;

const IntroContainer = styled.h1`
    padding: 7rem 0 4.2rem 0;
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
    animation: rotateAndShake 2.5s ease-in-out infinite;
    position: absolute;
`;

const IntroSubContainer = styled.p`
    font-family: var(--font-default);
    font-size: var(--font-text-large);
    color: #333;
    line-height: 1.3;
    margin-bottom: 3.2rem;
`;

const TabContainer = styled.div`
    margin: 0 auto;
`;

const TabContent = styled.div`
    margin-top: 0.625rem;
    border-radius: 5px;
`;

const contentData = {
    personal: [
        {
            id: '0101',
            title: 'HELLO, MONEY',
            description: '지출관리 및 시각화한 애플리케이션',
            image: '/project/personal_01.gif',
            staticImage: '/project/personal_01.webp',
            techs: ['React'],
            link: `/project/personal/0101`,
        },
        {
            id: '0102',
            title: 'FAVORITE COUNTRIES',
            description: '좋아하는 국가 리스트 만들기 웹사이트',
            image: '/project/personal_02.gif',
            staticImage: '/project/personal_02.webp',
            techs: ['React', 'TypeScript'],
            link: `/project/personal/0102`,
        },
        {
            id: '0103',
            title: 'POKEDEX',
            description: '포켓몬에 대해 알려주는 포켓몬 도감',
            image: '/project/personal_03.gif',
            staticImage: '/project/personal_03.webp',
            techs: ['Next.js', 'TypeScript'],
            link: `/project/personal/0103`,
        },
    ],
    // ... (다른 데이터 유지)
};

const Project: React.FC = () => {
    const [activeTab, setActiveTab] = useState('personal');
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setSelectedTechs([]);
    };

    useEffect(() => {
        if (activeTab) {
            gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });
        }
    }, [activeTab, selectedTechs]);

    return (
        <Wrap>
            <TabContainer>
                <IntroContainer>
                    MY PROJECT
                    <ImageWrapper>
                        <AnimatedImage src="/home/main_hat.webp" alt=" 이미지" />
                    </ImageWrapper>
                </IntroContainer>
                <IntroSubContainer>
                    다양한 웹 애플리케이션을 제작하기 위해
                    <br /> React, Next.js, TypeScript, JavaScript으로 만든 프로젝트입니다.
                </IntroSubContainer>
                <TabNavigation activeTab={activeTab} handleTabChange={handleTabChange} />
                <FilterButtons
                    activeTab={activeTab}
                    contentData={contentData}
                    techFilters={['React', 'Next.js', 'TypeScript', 'JavaScript']}
                    selectedTechs={selectedTechs}
                    setSelectedTechs={setSelectedTechs}
                />
                <TabContent ref={contentRef}>
                    <GridContent activeTab={activeTab} contentData={contentData} selectedTechs={selectedTechs} />
                </TabContent>
            </TabContainer>
        </Wrap>
    );
};

export default Project;
