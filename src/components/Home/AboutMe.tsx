import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-height: 100vh;
    padding-left: 20%;
    position: relative;
    z-index: 1;
`;

const AnimatedText = styled.h2`
    font-family: 'Exo 2', sans-serif;
    font-weight: 700;
    font-size: 136px;
    opacity: 0;
    margin: 20px 0;
    transform: translateX(100px);
    position: relative;
    display: flex;
    align-items: center;
`;

const Icon = styled.img`
    width: 22px;
    height: 22px;
    margin-right: 5px;
`;

const OverlayCircle = styled.div<{ position: string; bgColor: string }>`
    padding: 6px 15px;
    background-color: ${({ bgColor }) => bgColor};
    opacity: 0.98;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    position: absolute;
    top: 60%;
    left: ${({ position }) => position};
    transform: translateX(-50%);
    pointer-events: none;
`;

const AboutMe: React.FC = () => {
    const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const texts = textRefs.current;
        const wrapper = wrapperRef.current;

        if (!wrapper || texts.length === 0) return;

        texts.forEach((text, index) => {
            if (text) {
                gsap.set(text, { opacity: 0, x: 100 });

                ScrollTrigger.create({
                    trigger: wrapper,
                    start: `top+=${index * 100} center`,
                    end: `bottom-=${(texts.length - index - 1) * 100} center`,
                    onEnter: () => {
                        gsap.to(text, {
                            opacity: 1,
                            x: 0,
                            duration: 0.8,
                            ease: 'power2.out',
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(text, {
                            opacity: 0,
                            x: 100,
                            duration: 0.8,
                            ease: 'power2.in',
                        });
                    },
                    markers: true,
                });
            }
        });

        // 컴포넌트가 언마운트될 때 ScrollTrigger 제거
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const positions = ['75%', '25%', '75%'];
    const colors = ['#67ACEB', '#ffcf0b', '#aa87ea'];
    const icons = [
        '/public/home/about_icon_01.png',
        '/public/home/about_icon_02.png',
        '/public/home/about_icon_03.png',
    ];
    const circleTexts = ['끝없는 아이디어', '유연한 사고', '신뢰성 가득 팀워크'];

    return (
        <TextWrapper ref={wrapperRef}>
            {['Creativity', 'Composure', 'Responsible'].map((text, index) => (
                <AnimatedText key={text} ref={(el) => (textRefs.current[index] = el)}>
                    <OverlayCircle position={positions[index]} bgColor={colors[index]}>
                        <Icon src={icons[index]} alt={`Icon ${index + 1}`} />
                        {circleTexts[index]}
                    </OverlayCircle>
                    {text}
                </AnimatedText>
            ))}
        </TextWrapper>
    );
};

export default AboutMe;
