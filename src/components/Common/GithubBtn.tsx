import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const GitHubButton = styled.a`
    position: absolute;
    top: 20px;
    right: 70px;
    padding: 10px 20px;
    background-color: #f989b3;
    color: #000;
    text-decoration: none;
    font-family: 'Exo 2', sans-serif;
    font-weight: 400;
    font-size: 14px;
    border-radius: 20px;
    display: inline-flex;
    z-index: 102;
    gap: 2px;

    &::before {
        content: '';
        z-index: 1;
        opacity: 0.1;
        pointer-events: none;
        mix-blend-mode: exclusion;
        background-image: url('/texture_background.png');
        background-position: 0 0;
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
    }

    &:hover {
        background-color: #f76a9c;
    }

    span {
        display: inline-block;
        transform-origin: center;
    }
`;

const GithubBtn: React.FC = () => {
    const buttonRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        if (!buttonRef.current) return;

        const chars = buttonRef.current.querySelectorAll('span');

        // GSAP 애니메이션 설정
        const tl = gsap.timeline({ paused: true });

        tl.to(chars, {
            duration: 1, // 지속 시간
            rotationY: 360, // Y축 회전
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
        <GitHubButton href="https://github.com/leeboa2005" target="_blank" ref={buttonRef}>
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
    );
};

export default GithubBtn;
