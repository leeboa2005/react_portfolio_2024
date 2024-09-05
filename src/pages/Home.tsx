import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    font-size: 21px;
    text-align: center;
    margin-bottom: 20px;
    opacity: 0;
`;

const Title = styled.h1`
    font-family: 'Exo 2', sans-serif;
    font-weight: 700;
    font-size: 136px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0; /* 초기 상태는 보이지 않음 */
    transform: scale(1); /* 초기 스케일을 1로 설정 */
`;

const ShapeImage = styled.img`
    position: absolute;
    opacity: 0;
    width: 120px;
    height: 120px;
    object-fit: cover;
`;

const shapes = [
    { src: 'main/main_02.png', top: '20%', left: '80%' },
    { src: 'main/main_03.png', top: '70%', left: '15%' },
    { src: 'main/main_04.png', top: '60%', left: '75%' },
    { src: 'main/main_05.png', top: '40%', left: '50%' },
    { src: 'main/main_06.png', top: '15%', left: '30%' },
    { src: 'main/main_07.png', top: '50%', left: '20%' },
    { src: 'main/main_08.png', top: '80%', left: '40%' },
    { src: 'main/main_09.png', top: '30%', left: '70%' },
    { src: 'main/main_10.png', top: '40%', left: '60%' },
    { src: 'main/main_11.png', top: '70%', left: '80%' },
    { src: 'main/main_12.png', top: '85%', left: '25%' },
];

const Home: React.FC = () => {
    const titleRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const subTitleRef = useRef<HTMLParagraphElement>(null);
    const shapesRef = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        const tl = gsap.timeline();

        shapes.forEach((_, index) => {
            tl.to(shapesRef.current[index], {
                opacity: 1,
                duration: 0.1,
                delay: index * 0.01,
            }).to(
                shapesRef.current[index],
                {
                    y: '-=10',
                    repeat: -1,
                    yoyo: true,
                    duration: 2.5,
                    ease: 'power1.inOut',
                },
                `-=${0.2}`
            );
        });

        tl.to(subTitleRef.current, {
            opacity: 1,
            duration: 0.3,
            y: 0,
        });

        tl.to(
            titleRef.current,
            {
                opacity: 1,
                duration: 0.5,
            },
            '+=0.2'
        );

        tl.to(
            logoRef.current,
            {
                rotation: 360,
                duration: 3,
                ease: 'power2.out',
            },
            '-=0.5'
        );

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
        <HomeWrap>
            {shapes.map((shape, index) => (
                <ShapeImage
                    key={index}
                    ref={(el) => (shapesRef.current[index] = el)}
                    src={shape.src}
                    style={{
                        top: shape.top,
                        left: shape.left,
                    }}
                    alt={`Shape ${index + 1}`}
                />
            ))}
            <TitleSection>
                <SubTitle ref={subTitleRef}>
                    Front-end Developer
                    <br /> PortFolio
                </SubTitle>
                <Title ref={titleRef}>
                    <span>BOA</span>
                    <LogoImage ref={logoRef} src="/title_logo.png" alt="타이틀 로고" />
                    <span>LEE</span>
                </Title>
            </TitleSection>
        </HomeWrap>
    );
};

export default Home;
