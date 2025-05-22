'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SkillCategory {
    title: string;
    skills: string[];
}

// 슬라이더 아이콘 컴포넌트
const ChevronLeft = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const ChevronRight = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

gsap.registerPlugin(ScrollTrigger);

const SkillsWrap = styled.div`
    width: var(--default-width);
    margin: 0 auto;
    padding: 2rem 0;
    position: relative;
    overflow: hidden;

    @media (max-width: 1024px) {
        width: 100%;
        padding: 2rem 1rem;
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

const MainTitle = styled.h2`
    font-size: 1rem;
    font-weight: var(--font-weight-thin);
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(1.25rem);

    @media (max-width: 1024px) {
        margin-bottom: 3rem;
        opacity: 1;
        transform: translateY(0);
    }
`;

const CardsSection = styled.section`
    position: relative;
    height: 80vh;
    width: 100%;
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px);

    @media (max-width: 1024px) {
        height: auto;
        opacity: 1;
        transform: none;
    }
`;

const CardsContainer = styled.div`
    display: flex;
    gap: 2rem;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;

    @media (max-width: 1024px) {
        position: relative;
        height: auto;
        transform: none !important;
        transition: transform 0.5s ease;
    }
`;

const ProcessCard = styled.div`
    flex: 0 0 35rem;
    height: 90%;
    border-radius: var(--default-radius, 8px);
    padding: 2rem;
    background: #f5f5f5;
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

    &.active::after {
        width: 100%;
    }

    @media (max-width: 1024px) {
        flex: 0 0 calc(100% - 2rem);
        height: auto;
        min-height: 350px;
        margin-bottom: 0;

        @media (min-width: 600px) {
            flex: 0 0 calc(50% - 1rem);
        }

        @media (min-width: 900px) {
            flex: 0 0 calc(33.333% - 1.5rem);
        }
    }

    @media (max-width: 734px) {
        flex: 0 0 100%;
        width: 100%;
        min-height: 300px;
        padding: 1.5rem;
    }
`;

const CardContent = styled.div`
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3rem;

    @media (max-width: 734px) {
        margin-bottom: 2rem;
    }
`;

const CardTitle = styled.h3`
    font-size: 2.5rem;
    font-weight: bold;
    width: 80%;
    word-break: keep-all;
    line-height: 1.2;

    @media (max-width: 1024px) {
        font-size: 2rem;
    }

    @media (max-width: 734px) {
        font-size: 1.75rem;
    }

    @media (max-width: 480px) {
        font-size: 1.5rem;
    }
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
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    @media (max-width: 734px) {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.25rem;
    }
`;

const SkillsList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: auto;
    width: 100%;
`;

const SkillItem = styled.li`
    padding: 1rem 0;
    font-size: 1.4rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 1024px) {
        font-size: 1.2rem;
    }

    @media (max-width: 734px) {
        font-size: 1rem;
        padding: 0.875rem 0;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
        padding: 0.75rem 0;
    }
`;

const NavigationButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
    gap: 8px;
`;

const NavButton = styled.button`
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: black;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background: rgba(0, 0, 0, 0.05);
    }
`;

const SliderWrapper = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
`;

const SliderContainer = styled.div`
    display: flex;
    gap: 2rem;
    transition: transform 0.5s ease;
`;

const Skills: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [activeCards, setActiveCards] = useState<number[]>([0]);
    const [visibleCards, setVisibleCards] = useState(1);

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 734);
            setIsTablet(width > 734 && width <= 1024);

            if (width <= 600) {
                setVisibleCards(1);
            } else if (width <= 900) {
                setVisibleCards(2);
            } else if (width <= 1024) {
                setVisibleCards(3);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    useEffect(() => {
        const sequentialTl = gsap.timeline({
            scrollTrigger: {
                trigger: lineRef.current,
                start: 'top 90%',
                end: 'bottom top',
                toggleActions: 'play none none none',
            },
        });

        sequentialTl
            .to(lineRef.current, {
                width: '100%',
                duration: 1.6,
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
                '-=0.8'
            )
            .to(
                sectionRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                },
                '-=0.4'
            );

        if (containerRef.current && sectionRef.current && !isMobile && !isTablet) {
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

                    // 마지막에 도달하면 모든 카드 활성화
                    if (progress > 0.95) {
                        cardsRef.current.forEach((card) => {
                            if (card) {
                                card.style?.setProperty('--fill-percentage', '100%');
                            }
                        });
                        setActiveCards(Array.from({ length: totalCards }, (_, i) => i));
                        return;
                    }

                    cardsRef.current.forEach((card, index) => {
                        if (!card) return;

                        const cardStartProgress = index * progressPerCard;
                        const cardEndProgress = cardStartProgress + progressPerCard;

                        if (progress >= cardStartProgress && progress < cardEndProgress) {
                            const fillPercentage = ((progress - cardStartProgress) / progressPerCard) * 100;
                            card.style?.setProperty('--fill-percentage', `${fillPercentage}%`);
                            card.classList?.add('fill');

                            // 현재 카드와 이전 카드들을 활성화
                            const newActiveCards = Array.from({ length: index + 1 }, (_, i) => i);
                            setActiveCards(newActiveCards);
                        } else if (progress >= cardEndProgress) {
                            card.style?.setProperty('--fill-percentage', `100%`);
                        } else {
                            card.style?.setProperty('--fill-percentage', `0%`);
                        }

                        if (index > 0) {
                            const previousCard = cardsRef.current[index - 1];
                            if (previousCard && progress >= cardStartProgress) {
                                previousCard.style?.setProperty('--fill-percentage', `100%`);
                            }
                        }
                    });
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [isMobile, isTablet]);

    // 슬라이더 이동 함수
    const moveSlider = (index: number) => {
        if (sliderRef.current) {
            const cardWidth = sliderRef.current.children[0].getBoundingClientRect().width + 32; // 카드 너비 + gap
            sliderRef.current.style.transform = `translateX(-${index * cardWidth}px)`;

            // 현재 카드와 이전 카드들을 활성화
            const newActiveCards = Array.from({ length: index + 1 }, (_, i) => i);
            setActiveCards(newActiveCards);

            // 마지막 카드에 도달하면 모든 카드 활성화
            if (index === skillCategories.length - visibleCards) {
                setActiveCards(Array.from({ length: skillCategories.length }, (_, i) => i));
            }
        }
    };

    // 다음 카드로 이동
    const nextCard = () => {
        const newIndex = Math.min(currentIndex + 1, skillCategories.length - visibleCards);
        setCurrentIndex(newIndex);
        moveSlider(newIndex);

        // 마지막 카드에 도달하면 모든 카드 활성화
        if (newIndex === skillCategories.length - visibleCards) {
            setActiveCards(Array.from({ length: skillCategories.length }, (_, i) => i));
        }
    };

    // 이전 카드로 이동
    const prevCard = () => {
        const newIndex = Math.max(currentIndex - 1, 0);
        setCurrentIndex(newIndex);
        moveSlider(newIndex);
    };

    const handleCardClick = (index: number) => {
        setCurrentIndex(index);
        moveSlider(index);
    };

    const skillCategories: SkillCategory[] = [
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
                {!isMobile && !isTablet ? (
                    // 데스크탑 뷰 - 가로 스크롤
                    <CardsContainer ref={containerRef}>
                        {skillCategories.map((category, index) => (
                            <ProcessCard
                                key={index}
                                ref={(el: HTMLDivElement | null) => (cardsRef.current[index] = el)}
                                className={activeCards.includes(index) ? 'active' : ''}
                            >
                                <CardContent>
                                    <CardHeader>
                                        <CardTitle>{category.title}</CardTitle>
                                        <Number onClick={() => handleCardClick(index)}>{index + 1}</Number>
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
                ) : (
                    // 태블릿/모바일 뷰 - 슬라이더
                    <>
                        <NavigationButtons>
                            <NavButton onClick={prevCard} disabled={currentIndex === 0}>
                                <ChevronLeft />
                            </NavButton>
                            <NavButton
                                onClick={nextCard}
                                disabled={currentIndex >= skillCategories.length - visibleCards}
                            >
                                <ChevronRight />
                            </NavButton>
                        </NavigationButtons>
                        <SliderWrapper>
                            <SliderContainer ref={sliderRef}>
                                {skillCategories.map((category, index) => (
                                    <ProcessCard
                                        key={index}
                                        ref={(el: HTMLDivElement | null) => (cardsRef.current[index] = el)}
                                        className={activeCards.includes(index) ? 'active' : ''}
                                    >
                                        <CardContent>
                                            <CardHeader>
                                                <CardTitle>{category.title}</CardTitle>
                                                <Number onClick={() => handleCardClick(index)}>{index + 1}</Number>
                                            </CardHeader>
                                            <SkillsList>
                                                {category.skills.map((skill, skillIndex) => (
                                                    <SkillItem key={skillIndex}>{skill}</SkillItem>
                                                ))}
                                            </SkillsList>
                                        </CardContent>
                                    </ProcessCard>
                                ))}
                            </SliderContainer>
                        </SliderWrapper>
                    </>
                )}
            </CardsSection>
        </SkillsWrap>
    );
};

export default Skills;
