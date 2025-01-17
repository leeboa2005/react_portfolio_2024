import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: var(--default-width);
    margin: 0 auto;
    padding: 2rem;
    gap: 2rem;
    align-items: flex-start;
    position: relative;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Line = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: black;
`;

const Title = styled.div`
    font-size: 1rem;
    font-weight: var(--font-weight-thin);
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(20px);
`;

const Contact: React.FC = () => {
    const lineRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: lineRef.current,
                start: 'top 90%',
                end: 'top 60%',
                toggleActions: 'play none none none',
            },
        });

        timeline
            .to(lineRef.current, {
                width: '100%',
                duration: 1.2,
                ease: 'power2.out',
            })
            .to(
                titleRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                },
                '-=0.5'
            );
    }, []);

    return (
        <ContactContainer>
            <Line ref={lineRef} />
            <Title ref={titleRef}>CONTACT</Title>
        </ContactContainer>
    );
};

export default Contact;
