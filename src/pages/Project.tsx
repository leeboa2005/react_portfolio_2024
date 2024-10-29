import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import TabNavigation from '../components/Project/TabNavigation';
import FilterButtons from '../components/Project/FilterButtons';
import GridContent from '../components/Project/GridContent';

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
    animation: rotateAndShake 2.5s ease-in-out infinite;
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

const TabContent = styled.div`
    margin-top: 0.625rem;
    border-radius: 5px;
`;

const contentData = {
    personal: [
        {
            title: 'HELLO, MONEY',
            description: '지출관리 및 시각화한 애플리케이션',
            image: '/project/personal_01.gif',
            staticImage: '/project/personal_01.png',
            techs: ['React', 'TypeScript'],
            link: 'https://expenditure-management-phi.vercel.app/',
        },
        {
            title: 'FAVORITE COUNTRIES',
            description: '좋아하는 국가 리스트 만들기 웹사이트',
            image: '/project/personal_02.gif',
            staticImage: '/project/personal_02.png',
            techs: ['React', 'TypeScript'],
            link: 'https://favorite-countries-sooty.vercel.app/',
        },
        {
            title: 'POKEDEX',
            description: '포켓몬에 대해 알려주는 포켓몬 도감',
            image: '/project/personal_03.gif',
            staticImage: '/project/personal_03.png',
            techs: ['Next.js', 'TypeScript'],
            link: 'https://pokemon-book-lyart.vercel.app/',
        },
    ],
    team: [
        {
            title: '@GATHER_HERE',
            description: 'IT 직군 통합 플랫폼',
            image: '/project/team_01.png',
            staticImage: '/project/team_01.png',
            techs: ['Next.js', 'TypeScript'],
            link: 'https://github.com/leeboa2005/gather_here',
        },
        {
            title: 'BIGBUN',
            description: '대전 빵집 추천 웹사이트',
            image: '/project/team_02.png',
            staticImage: '/project/team_02.png',
            techs: ['Next.js', 'TypeScript'],
            link: 'https://github.com/leeboa2005/big_bun?tab=readme-ov-file',
        },
        {
            title: 'ITFIT',
            description: 'IT 직종 테스트 플랫폼',
            image: '/project/team_03.png',
            staticImage: '/project/team_03.png',
            techs: ['React', 'TypeScript'],
            link: 'https://github.com/leeboa2005/ITFIT',
        },
    ],
    work: [
        {
            title: 'AMIPHARM',
            description: '생명과학 회사 웹사이트 제작',
            image: '/project/work_01.png',
            staticImage: '/project/work_01.png',
            techs: ['JavaScript'],
            link: 'https://amipham.cafe24.com/',
        },
        {
            title: 'HANNAH',
            description: '한나패드 웹사이트 제작',
            image: '/project/work_02.png',
            staticImage: '/project/work_02.png',
            techs: ['JavaScript'],
            link: 'https://www.thebrandhannah.co.kr/content/content.php?cont=cs_info',
        },
        {
            title: 'GODOIL',
            description: '고도일 병원 웹사이트 유지보수',
            image: '/project/work_03.png',
            staticImage: '/project/work_03.png',
            techs: ['JavaScript'],
            link: 'https://www.godoil.com/',
        },
    ],
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
        gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });
    }, [activeTab]);

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
                <TabNavigation activeTab={activeTab} handleTabChange={handleTabChange} />
                <FilterButtons
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
