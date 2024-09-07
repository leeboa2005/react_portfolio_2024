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
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <TextWrapper ref={wrapperRef}>
            {['Creativity', 'Composure', 'Responsible'].map((text, index) => (
                <AnimatedText key={text} ref={(el) => (textRefs.current[index] = el)}>
                    {text}
                </AnimatedText>
            ))}
        </TextWrapper>
    );
};

export default AboutMe;
