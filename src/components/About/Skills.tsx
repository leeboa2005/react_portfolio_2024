import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillsWrap = styled.div`
    width: var(--default-width);
    margin: 0 auto;
    padding: 2rem 0;
    position: relative;
    overflow: hidden;
`;

const Line = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: black;
`;

const MainTitle = styled.h2`
    font-size: 1rem;
    font-weight: var(--font-weight-thin);
    margin-bottom: 5rem;
    opacity: 0;
    transform: translateY(1.25rem);
`;

const CardsSection = styled.section`
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    opacity: 0;
`;

const CardsContainer = styled.div`
    display: flex;
    gap: 2rem;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
`;

const ProcessCard = styled.div`
    flex: 0 0 35rem;
    height: 60%;
    border-radius: var(--default-radius);
    padding: 2rem;
    background: #f0f0f0;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0%;
        height: 100%;
        background-color: var(--main-color-green);
        z-index: 0;
        transition: width 0.7s ease-in-out;
    }

    &.fill::after {
        width: var(--fill-percentage, 0%);
    }

    &:first-child::after {
        width: 100%;
    }
`;

const CardContent = styled.div`
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3rem;
`;

const CardTitle = styled.h3`
    font-size: 2.5rem;
    font-weight: bold;
`;

const Number = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 0.125rem solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
`;

const SkillsList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: auto;
`;

const SkillItem = styled.li`
    padding: 1rem 0;
    font-size: 1.4rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child {
        border-bottom: none;
    }
`;

const Skills: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const sequentialTl = gsap.timeline();

        sequentialTl
            .to(lineRef.current, {
                width: '100%',
                duration: 1.2,
                ease: 'power2.out',
            })
            .to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.inOut',
            })
            .to(sectionRef.current, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.inOut',
            });

        if (containerRef.current && sectionRef.current) {
            const totalWidth = containerRef.current.scrollWidth;
            const sectionWidth = sectionRef.current.offsetWidth;

            ScrollTrigger.create({
                trigger: sectionRef.current,
                pin: true,
                start: 'top top',
                end: () => `+=${totalWidth - sectionWidth}`,
                scrub: 1,
                invalidateOnRefresh: true,
                animation: gsap.to(containerRef.current, {
                    x: () => -(totalWidth - sectionWidth),
                    ease: 'none',
                }),
                onUpdate: (self) => {
                    const progress = self.progress;
                    const totalCards = cardsRef.current.length;
                    const progressPerCard = 1 / totalCards;

                    cardsRef.current.forEach((card, index) => {
                        if (!card) return;

                        const cardStartProgress = index * progressPerCard;
                        const cardEndProgress = cardStartProgress + progressPerCard;

                        if (progress >= cardStartProgress && progress < cardEndProgress) {
                            const fillPercentage = ((progress - cardStartProgress) / progressPerCard) * 100;
                            card.style.setProperty('--fill-percentage', `${fillPercentage}%`);
                            card.classList.add('fill');
                        } else if (progress >= cardEndProgress) {
                            card.style.setProperty('--fill-percentage', `100%`);
                        } else {
                            card.style.setProperty('--fill-percentage', `0%`);
                        }

                        if (index > 0) {
                            const previousCard = cardsRef.current[index - 1];
                            if (previousCard && progress >= cardStartProgress) {
                                previousCard.style.setProperty('--fill-percentage', `100%`);
                            }
                        }
                    });
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const skillCategories = [
        {
            title: '개발 기술',
            skills: ['JavaScript', 'TypeScript', 'React', 'Next.js'],
        },
        {
            title: '스타일링 및 마크업',
            skills: ['HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
        },
        {
            title: '형상 관리',
            skills: ['Git', 'Svn'],
        },
        {
            title: '서비스형 백엔드 및 배포',
            skills: ['Firebase', 'Supabase', 'Vercel'],
        },
    ];

    return (
        <SkillsWrap>
            <Line ref={lineRef} />
            <MainTitle ref={titleRef}>나의 기술들</MainTitle>
            <CardsSection ref={sectionRef}>
                <CardsContainer ref={containerRef}>
                    {skillCategories.map((category, index) => (
                        <ProcessCard key={index} ref={(el) => (cardsRef.current[index] = el)}>
                            <CardContent>
                                <CardHeader>
                                    <CardTitle>{category.title}</CardTitle>
                                    <Number>{index + 1}</Number>
                                </CardHeader>
                                <SkillsList>
                                    {category.skills.map((skill, skillIndex) => (
                                        <SkillItem key={skillIndex}>{skill}</SkillItem>
                                    ))}
                                </SkillsList>
                            </CardContent>
                        </ProcessCard>
                    ))}
                </CardsContainer>
            </CardsSection>
        </SkillsWrap>
    );
};

export default Skills;
