import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GithubBtn from '../components/Common/GithubBtn';
import GlobalStyle from '../assets/styles/GlobalStyle';

gsap.registerPlugin(ScrollTrigger);

const HomeWrap = styled.section`
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
`;

const LogoImage = styled.img`
    width: 91px;
    height: 91px;
`;

const TitleSection = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

const SubTitle = styled.p`
    font-family: 'Exo 2', sans-serif;
    font-weight: 400;
    line-height: 1.4;
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
    opacity: 0;
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    border: 1px solid black;
    border-radius: 30px;
    gap: 10px;
`;

const SubIcon = styled.img`
    width: 23px;
    height: 23px;
`;
const Title = styled.h1`
    font-family: 'Exo 2', sans-serif;
    font-weight: 700;
    font-size: 136px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(1);
`;

const ShapeImage = styled.img`
    position: absolute;
    opacity: 0;
    object-fit: cover;
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
    const titleRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const subTitleRef = useRef<HTMLParagraphElement>(null);
    const shapesRef = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        const tl = gsap.timeline();

        // 1. 모든 이미지 요소에 페이드 인 효과 적용
        tl.to(shapesRef.current, {
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power2.out',
            onComplete: () => {
                shapesRef.current.forEach((shape) => {
                    gsap.to(shape, {
                        y: '-=10',
                        repeat: -1,
                        yoyo: true,
                        duration: 2,
                        ease: 'power1.inOut',
                    });
                });
            },
        });

        // 2. Front-end Developer가 나타나는 애니메이션
        tl.to(
            subTitleRef.current,
            {
                opacity: 1,
                duration: 1,
                y: 0,
                ease: 'power2.out',
            },
            '+=0.5'
        );

        // 3. BOA LEE가 마지막에 나타나면서 로고가 회전하는 애니메이션
        tl.to(
            titleRef.current,
            {
                opacity: 1,
                duration: 1.5,
                ease: 'power3.out',
                onStart: () => {
                    gsap.to(logoRef.current, {
                        rotation: 360,
                        duration: 3,
                        ease: 'power2.out',
                    });
                },
            },
            '+=0.5'
        );

        // 4. 타이틀을 숨기는 스크롤 애니메이션
        gsap.to(titleRef.current, {
            opacity: 0,
            y: -100,
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 20%',
                end: 'top -30%',
                scrub: 1,
            },
        });
    }, []);

    return (
        <>
            <GlobalStyle />
            <HomeWrap>
                <GithubBtn />
                {shapes.map((shape, index) => (
                    <ShapeImage
                        key={index}
                        ref={(el) => (shapesRef.current[index] = el)}
                        src={shape.src}
                        style={{
                            top: shape.top,
                            left: shape.left,
                            width: shape.width,
                            height: shape.height,
                        }}
                        alt={`Shape ${index + 1}`}
                    />
                ))}
                <TitleSection>
                    <SubTitle ref={subTitleRef}>
                        <SubIcon src="/main/main_sub.png" alt="앞 아이콘" />
                        Front-end Developer PortFolio
                        <SubIcon src="/main/main_sub.png" alt="뒤 아이콘" />
                    </SubTitle>
                    <Title ref={titleRef}>
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
