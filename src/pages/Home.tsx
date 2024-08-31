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
    font-optical-sizing: auto;
    font-weight: 400;
    font-size: 21px;
    text-align: center;
    line-height: 1.4;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-family: 'Exo 2', sans-serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-size: 136px;
    line-height: 1.1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoImage = styled.img`
    width: 91px;
    height: 91px;
`;

const InfoWrap = styled.section`
    width: 1200px;
    margin: 0 auto;
    margin-top: -30px;
    display: flex;
    justify-content: center;
    gap: 20px;
    position: sticky;
    top: 350px;
`;

const CardUI = styled.div`
    width: 400px;
    height: 580px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    padding: 20px;
    opacity: 0;
    transform: translateY(50px);
`;

const TitleBox = styled.div`
    width: 240px;
    height: 300px;
    margin-right: 60px;
    background-color: #87cefa;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(1);
`;

const ContentBox = styled.div`
    width: 240px;
    height: 300px;
    margin-left: 60px;
    background-color: #87cefa;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.5s ease;
`;

const Home: React.FC = () => {
    const titleRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const infoWrapRef = useRef<HTMLDivElement>(null);
    const titleBoxRef = useRef<HTMLDivElement>(null);
    const contentBoxRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

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
                    markers: true,
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
                markers: true,
            },
        });

        // 카드 UI가 스크롤되면서 나타나는 애니메이션
        gsap.to(cardRef.current, {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
                markers: true,
                onEnter: () => {
                    // TitleBox가 나타나는 애니메이션
                    gsap.to(titleBoxRef.current, {
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power2.inOut',
                    });

                    // ContentBox가 나타나는 애니메이션
                    gsap.to(contentBoxRef.current, {
                        opacity: 1,
                        duration: 1,
                        ease: 'power2.inOut',
                    });
                },
            },
        });

        // 스크롤할 때 TitleBox가 접히는 애니메이션
        gsap.to(titleBoxRef.current, {
            height: '70px',
            transform: 'scaleY(0.3)',
            scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 50%',
                end: 'top 30%',
                scrub: 1,
                markers: true,
            },
        });

        // 스크롤할 때 ContentBox가 서서히 사라지는 애니메이션
        gsap.to(contentBoxRef.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 50%',
                end: 'top 30%',
                scrub: 1,
                markers: true,
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
                <InfoWrap ref={infoWrapRef}>
                    <TitleBox ref={titleBoxRef}>타이틀</TitleBox>
                    <CardUI ref={cardRef}>
                        <p>HI</p>
                    </CardUI>
                    <ContentBox ref={contentBoxRef}>내용.</ContentBox>
                </InfoWrap>
            </HomeWrap>
        </>
    );
};

export default Home;
