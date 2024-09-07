import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobalStyle from '../assets/styles/GlobalStyle';
import GithubBtn from '../components/Common/GithubBtn';
import AboutMe from '../components/Home/AboutMe';
import Shapes from '../components/Home/Shapes';
import TitleSection from '../components/Home/TitleSection';

gsap.registerPlugin(ScrollTrigger);

const HomeWrap = styled.section`
    width: 100%;
    height: auto;
    position: relative;
    overflow-x: hidden;
`;

const ContentWrap = styled.section`
    width: 100%;
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const shapes = [
    { src: 'main/main_01.png', top: '10%', left: '10%', width: '100px', height: '100px' },
    { src: 'main/main_02.png', top: '15%', left: '75%', width: '120px', height: '120px' },
    { src: 'main/main_03.png', top: '17%', left: '40%', width: '140px', height: '140px' },
    { src: 'main/main_04.png', top: '35%', left: '60%', width: '80px', height: '80px' },
    { src: 'main/main_05.png', top: '40%', left: '20%', width: '60px', height: '60px' },
    { src: 'main/main_06.png', top: '50%', left: '80%', width: '120px', height: '120px' },
    { src: 'main/main_07.png', top: '60%', left: '30%', width: '120px', height: '120px' },
    { src: 'main/main_08.png', top: '65%', left: '55%', width: '120px', height: '120px' },
    { src: 'main/main_09.png', top: '75%', left: '10%', width: '120px', height: '120px' },
    { src: 'main/main_10.png', top: '80%', left: '70%', width: '120px', height: '120px' },
    { src: 'main/main_12.png', top: '85%', left: '40%', width: '120px', height: '120px' },
];

const Home: React.FC = () => {
    const shapesRef = useRef<(HTMLImageElement | null)[]>([]);
    const [startTitleAnimation, setStartTitleAnimation] = useState(false);

    const handleShapesComplete = () => {
        setStartTitleAnimation(true);
    };

    return (
        <>
            <GlobalStyle />
            <HomeWrap>
                <GithubBtn />
                <ContentWrap>
                    <Shapes shapes={shapes} shapesRef={shapesRef} onShapesComplete={handleShapesComplete} />
                    <TitleSection startAnimation={startTitleAnimation} />
                </ContentWrap>
                <AboutMe />
            </HomeWrap>
        </>
    );
};

export default Home;
