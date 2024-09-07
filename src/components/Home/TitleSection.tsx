import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    transform: translateY(20px);
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

const LogoImage = styled.img`
    width: 91px;
    height: 91px;
`;

const TitleSectionContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

interface TitleSectionProps {
    startAnimation: boolean;
}

const TitleSection: React.FC<TitleSectionProps> = ({ startAnimation }) => {
    const subTitleRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (startAnimation) {
            const tl = gsap.timeline();

            // SubTitle 애니메이션
            tl.to(subTitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power2.out',
            });

            // Title 및 로고 애니메이션
            tl.to(
                titleRef.current,
                {
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                },
                '+=0.5'
            );

            // 로고 회전 애니메이션
            tl.to(
                logoRef.current,
                {
                    rotation: 360,
                    duration: 2,
                    ease: 'power2.out',
                },
                '<'
            );

            // 스크롤 애니메이션
            ScrollTrigger.create({
                trigger: titleRef.current,
                start: 'top 20%',
                end: 'top -30%',
                scrub: 1,
                animation: gsap.to([subTitleRef.current, titleRef.current], {
                    opacity: 0,
                    y: -100,
                }),
            });
        }
    }, [startAnimation]);

    return (
        <TitleSectionContainer>
            <SubTitle ref={subTitleRef}>
                <SubIcon src="/main/main_sub.png" alt="서브 타이틀 앞 아이콘" />
                Front-end Developer PortFolio
                <SubIcon src="/main/main_sub.png" alt="서브 타이틀 뒤 아이콘" />
            </SubTitle>
            <Title ref={titleRef}>
                <span>BOA</span>
                <LogoImage ref={logoRef} src="/title_logo.png" alt="타이틀 로고" />
                <span>LEE</span>
            </Title>
        </TitleSectionContainer>
    );
};

export default TitleSection;
