import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GithubBtn from '../components/Common/GithubBtn';
import GlobalStyle from '../assets/styles/GlobalStyle';

gsap.registerPlugin(ScrollTrigger);

const HomeWrap = styled.section`
    width: 100%;
    padding: 100px 0;
`;

const TitleSection = styled.div`
    margin: 80px 0 230px 0;
    position: relative;
    text-align: center;
`;

const SubTitle = styled.p`
    font-family: 'Exo 2', sans-serif;
    font-weight: 400;
    font-size: 21px;
    text-align: center;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-family: 'Exo 2', sans-serif;
    font-weight: 700;
    font-size: 136px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoImage = styled.img`
    width: 91px;
    height: 91px;
`;

const Home: React.FC = () => {
    const titleRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // 타이틀 섹션이 스크롤 되면 서서히 사라지는 애니메이션
        gsap.fromTo(
            titleRef.current,
            { opacity: 1, y: 0 },
            {
                opacity: 0,
                y: -100,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 20%',
                    end: 'top -30%',
                    scrub: 1,
                },
            }
        );

        gsap.to(logoRef.current, {
            rotation: 360,
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 20%',
                end: 'top -30%',
                scrub: 3,
            },
        });
    }, []);

    return (
        <>
            <GlobalStyle />
            <HomeWrap>
                <GithubBtn />
                <TitleSection ref={titleRef}>
                    <SubTitle>
                        Front-end Developer
                        <br /> PortFolio
                    </SubTitle>
                    <Title>
                        <span>BOA</span>
                        <LogoImage ref={logoRef} src="/title_logo.png" alt="타이틀 로고" />
                        <span>LEE</span>
                    </Title>
                </TitleSection>
            </HomeWrap>
        </>
    );
};

export default Home;
