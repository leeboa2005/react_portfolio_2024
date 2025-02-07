import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StyledCardProps {
    $isTablet?: boolean;
    $currentSlide?: number;
    $isFilled?: boolean;
}

const SkillsWrap = styled.div`
    width: var(--default-width);
    margin: 0 auto;
    padding: 2rem 0;
    position: relative;
    overflow: hidden;

    @media (max-width: 734px) {
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

    @media (max-width: 734px) {
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
        height: 500px;
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
    transition: transform 0.3s ease;
`;

const NavigationButtons = styled.div`
    display: none;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    padding: 0 1rem;

    @media (max-width: 1024px) {
        display: flex;
    }
`;

const NavButton = styled.button`
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.7);
    }

    &:disabled {
        background: rgba(0, 0, 0, 0.2);
        cursor: not-allowed;
    }
`;

const ProcessCard = styled.div<StyledCardProps>`
    flex: 0 0 35rem;
    height: 90%;
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

    @media (max-width: 1024px) {
        flex: 0 0 calc(50% - 1rem);
        height: 450px;

        &::after {
            width: ${(props) => (props.$isFilled ? '100%' : '0%')};
        }
    }

    @media (max-width: 734px) {
        flex: 0 0 calc(100% - 2rem);
        height: 350px;
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

    @media (max-width: 734px) {
        margin-bottom: 2rem;
    }
`;

const CardTitle = styled.h3`
    font-size: 2.5rem;
    font-weight: bold;

    @media (max-width: 734px) {
        font-size: 1.75rem;
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
`;

const SkillItem = styled.li`
    padding: 1rem 0;
    font-size: 1.4rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 734px) {
        font-size: 1rem;
        padding: 0.875rem 0;
    }
`;

const Skills: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [filledCards, setFilledCards] = useState<boolean[]>([]);

    useEffect(() => {
        let prevWidth = window.innerWidth;
        const breakpoints = [734, 1024];

        const handleResize = () => {
            const currentWidth = window.innerWidth;
            const crossedBreakpoint = breakpoints.some(
                (point) => (prevWidth <= point && currentWidth > point) || (prevWidth > point && currentWidth <= point)
            );

            if (crossedBreakpoint) {
                window.location.reload();
            }

            prevWidth = currentWidth;
            setIsTablet(currentWidth <= 1024);
            setIsMobile(currentWidth <= 734);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isTablet) {
            const initialFilledState = new Array(skillCategories.length).fill(false);
            if (isMobile) {
                initialFilledState[0] = true;
            } else {
                initialFilledState[0] = true;
                initialFilledState[1] = true;
            }
            setFilledCards(initialFilledState);
        }
    }, [isTablet, isMobile]);

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

        if (containerRef.current && sectionRef.current && window.innerWidth > 1024) {
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
                    });
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const handleNext = () => {
        const slidesPerView = isMobile ? 1 : 2;
        const maxSlide = Math.ceil(skillCategories.length / slidesPerView) - 1;

        if (currentSlide < maxSlide) {
            setCurrentSlide((prev) => prev + 1);
            const slideIndex = currentSlide + 1;

            setFilledCards((prev) => {
                const newState = [...prev];
                if (isMobile) {
                    newState[slideIndex] = true;
                } else {
                    const startIndex = slideIndex * 2;
                    newState[startIndex] = true;
                    if (startIndex + 1 < skillCategories.length) {
                        newState[startIndex + 1] = true;
                    }
                }
                return newState;
            });

            if (containerRef.current) {
                containerRef.current.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;
            }
        }
    };

    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
            const slideIndex = currentSlide - 1;

            setFilledCards((prev) => {
                const newState = [...prev];
                if (isMobile) {
                    newState[currentSlide] = false;
                } else {
                    const startIndex = (slideIndex + 1) * 2;
                    newState[startIndex] = false;
                    if (startIndex + 1 < skillCategories.length) {
                        newState[startIndex + 1] = false;
                    }
                }
                return newState;
            });

            if (containerRef.current) {
                containerRef.current.style.transform = `translateX(-${slideIndex * 100}%)`;
            }
        }
    };

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
                {isTablet && (
                    <NavigationButtons>
                        <NavButton onClick={handlePrev} disabled={currentSlide === 0}>
                            ←
                        </NavButton>
                        <NavButton
                            onClick={handleNext}
                            disabled={currentSlide === Math.ceil(skillCategories.length / (isMobile ? 1 : 2)) - 1}
                        >
                            →
                        </NavButton>
                    </NavigationButtons>
                )}
                <CardsContainer ref={containerRef}>
                    {skillCategories.map((category, index) => (
                        <ProcessCard
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                            $isTablet={isTablet}
                            $currentSlide={currentSlide}
                            $isFilled={filledCards[index]}
                        >
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
