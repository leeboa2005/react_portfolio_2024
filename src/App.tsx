import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import GlobalStyle from './assets/styles/GlobalStyle';

const HomeWrap = styled.section`
    width: 100%;
`;

const TitleSection = styled.div`
    margin-top: 100px;
    position: relative;
`;

const SubTitle = styled.p`
    font-family: 'Anton', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.4;
    gap: 20px;
`;

const Title = styled.h1`
    font-family: 'Anton', sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 120px;
    line-height: 1.1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const LogoImage = styled.img`
    width: 96px;
    height: 96px;
`;

const GitHubButton = styled.a`
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #f989b3;
    color: #000;
    text-decoration: none;
    font-family: 'Anton', sans-serif;
    font-size: 14px;
    border-radius: 20px;
    display: inline-flex;
    gap: 2px;

    &:hover {
        background-color: #f76a9c;
    }

    span {
        display: inline-block;
        transform-origin: center;
    }
`;

const App: React.FC = () => {
    const buttonRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        if (!buttonRef.current) return;

        const chars = buttonRef.current.querySelectorAll('span');

        // GSAP 애니메이션 설정
        const tl = gsap.timeline({ paused: true });

        tl.to(chars, {
            duration: 1, // 지속 시간
            rotationY: 360, // Y축 회저
            ease: 'power1.inOut', // 효과를 위한 ease 설정
            stagger: 0.07, // 순차적으로 애니메이션 적용
        });

        // 버튼에 호버 이벤트 리스너 추가
        const handleMouseEnter = () => tl.play();
        const handleMouseLeave = () => tl.reverse();

        const buttonElement = buttonRef.current;
        if (buttonElement) {
            buttonElement.addEventListener('mouseenter', handleMouseEnter);
            buttonElement.addEventListener('mouseleave', handleMouseLeave);
        }

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            if (buttonElement) {
                buttonElement.removeEventListener('mouseenter', handleMouseEnter);
                buttonElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <>
            <GlobalStyle />
            <HomeWrap>
                <GitHubButton href="https://github.com" target="_blank" ref={buttonRef}>
                    <span>S</span>
                    <span>e</span>
                    <span>e</span>
                    <span> </span>
                    <span>o</span>
                    <span>n</span>
                    <span> </span>
                    <span>G</span>
                    <span>i</span>
                    <span>t</span>
                    <span>H</span>
                    <span>u</span>
                    <span>b</span>
                </GitHubButton>
                <TitleSection>
                    <SubTitle>
                        Front-end Developer
                        <br /> PortFolio
                    </SubTitle>
                    <Title>
                        <span>BOA</span>
                        <LogoImage src="/title_logo.png" alt="타이틀 로고" />
                        <span>LEE</span>
                    </Title>
                </TitleSection>
            </HomeWrap>
        </>
    );
};

export default App;
