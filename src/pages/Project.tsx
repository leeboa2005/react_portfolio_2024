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

const IntroContainer = styled.div`
    padding: 7rem 0 4.2rem 0;
    display: flex;

    @media only screen and (max-width: 734px) {
        padding: 7rem 0 2.2rem 0;
    }
`;

const Title = styled.h1`
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
        {
            id: '0104',
            title: 'PORTFOLIO',
            description: '리엑트와 타입스크립트로 만든 2024 포트폴리오',
            image: '/project/personal_04.gif',
            staticImage: '/project/personal_04.webp',
            techs: ['React', 'TypeScript'],
            link: `/project/personal/0104`,
        },
    ],
    team: [
        {
            id: '0201',
            title: '@GATHER_HERE',
            description: 'IT 직군 통합 플랫폼',
            image: '/project/team_01.webp',
            staticImage: '/project/team_01.webp',
            techs: ['Next.js', 'TypeScript'],
            link: `/project/team/0201`,
        },
        {
            id: '0202',
            title: 'BIGBUN',
            description: '대전 빵집 추천 웹사이트',
            image: '/project/team_02.webp',
            staticImage: '/project/team_02.webp',
            techs: ['Next.js', 'TypeScript'],
            link: `/project/team/0202`,
        },
        {
            id: '0203',
            title: 'ITFIT',
            description: 'IT 직종 테스트 플랫폼',
            image: '/project/team_03.webp',
            staticImage: '/project/team_03.webp',
            techs: ['React'],
            link: `/project/team/0203`,
        },
    ],
    work: [
        {
            id: '0301',
            title: 'AMIPHARM',
            description: '생명과학 회사 웹사이트 제작',
            image: '/project/work_01.webp',
            staticImage: '/project/work_01.webp',
            techs: ['JavaScript'],
            link: `/project/work/0301`,
        },
        {
            id: '0302',
            title: 'HANNAH',
            description: '한나패드 웹사이트 제작',
            image: '/project/work_02.webp',
            staticImage: '/project/work_02.webp',
            techs: ['JavaScript'],
            link: `/project/work/0302`,
        },
        {
            id: '0303',
            title: 'SUGARCOACH',
            description: '슈가코치 앱 일부 기능 제작',
            image: '/project/work_03.gif',
            staticImage: '/project/work_03.webp',
            techs: ['React Native'],
            link: `/project/work/0303`,
        },
          {
            id: '0304',
            title: 'SNAPCOMPANY',
            description: '마케터용 B2B 관리자 페이지의 대시보드, 위젯, 설정 화면 등 주요 기능 페이지 제작',
            image: '/project/work_04.webp',
            staticImage: '/project/work_04.webp',
            techs: ['Vue.js'],
            link: `/project/work/0304`,
        },
    ],
};

const techFilters = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'React Native'];

const Project: React.FC = () => {
    const [activeTab, setActiveTab] = useState('personal');
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setSelectedTechs([]);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        if (activeTab) {
            gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });
        }
    }, [activeTab, selectedTechs]);

    return (
        <Wrap>
            <TabContainer>
                <IntroContainer>
                    <Title>MY PROJECT</Title>
                    <ImageWrapper>
                        <AnimatedImage src="/home/main_hat.webp" alt=" 이미지" />
                    </ImageWrapper>
                </IntroContainer>
                <IntroSubContainer>
                    다양한 웹 애플리케이션을 제작하기 위해
                    <br /> React, Next.js, TypeScript, JavaScript, React Native로 만든 프로젝트입니다.
                </IntroSubContainer>
                <TabNavigation activeTab={activeTab} handleTabChange={handleTabChange} />
                <FilterButtons
                    activeTab={activeTab}
                    contentData={contentData}
                    techFilters={techFilters}
                    selectedTechs={selectedTechs}
                    setSelectedTechs={setSelectedTechs}
                />
                <TabContent ref={contentRef}>
                    <GridContent
                        activeTab={activeTab}
                        contentData={contentData}
                        selectedTechs={selectedTechs}
                        techFilters={techFilters}
                    />
                </TabContent>
            </TabContainer>
        </Wrap>
    );
};

export default Project;
