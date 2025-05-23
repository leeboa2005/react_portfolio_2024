'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SelfIntroWrap = styled.div`
    width: var(--default-width);
    margin: 0 auto;
    position: relative;

    @media (max-width: 1024px) {
        width: 100%;
        padding: 0 1rem;
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

const Content = styled.div`
    width: 100%;
`;

const TextBox = styled.dl`
    padding: 2rem 0;
    font-size: var(--font-text-large);
    word-break: keep-all;

    dt {
        font-size: 1rem;
        font-weight: var(--font-weight-thin);
        margin-bottom: 4rem;
        opacity: 0;
        transform: translateY(20px);

        @media (max-width: 1024px) {
            margin-bottom: 2rem;
        }
    }

    dd {
        font-size: var(--font-text);
        line-height: 1.4;
        opacity: 0;
        transform: translateY(20px);

        p {
            margin-bottom: 1rem;
        }
    }
`;

const SelfIntroduction: React.FC = () => {
    const lineRef = useRef<HTMLDivElement>(null);
    const dtRef = useRef<HTMLElement>(null);
    const ddRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const introAnimationDuration = 2500;

        const isMobile = () => window.innerWidth <= 1024;

        if (isMobile()) {
            // 모바일/태블릿
            const timer = setTimeout(() => {
                const tl = gsap.timeline();

                tl.to(lineRef.current, {
                    width: '100%',
                    duration: 1.2,
                    ease: 'power2.out',
                })
                    .to(
                        dtRef.current,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: 'power2.out',
                        },
                        '-=0.4'
                    )
                    .to(
                        ddRef.current,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: 'power2.out',
                        },
                        '-=0.2'
                    );
            }, introAnimationDuration);

            return () => clearTimeout(timer);
        } else {
            // 데스크탑
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: lineRef.current,
                    start: 'top 90%',
                    end: 'bottom top',
                    toggleActions: 'play none none none',
                },
            });

            tl.to(lineRef.current, {
                width: '100%',
                duration: 1.6,
                ease: 'power2.out',
            })
                .to(
                    dtRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                    },
                    '-=0.5'
                )
                .to(ddRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                });

            // 리사이즈 이벤트 처리
            const handleResize = () => {
                if (isMobile()) {
                    // ScrollTrigger 제거
                    ScrollTrigger.getAll().forEach((trigger) => {
                        if (trigger.trigger === lineRef.current) {
                            trigger.kill();
                        }
                    });

                    // 모바일
                    const timer = setTimeout(() => {
                        const mobileTl = gsap.timeline();

                        mobileTl
                            .to(lineRef.current, {
                                width: '100%',
                                duration: 1.2,
                                ease: 'power2.out',
                            })
                            .to(
                                dtRef.current,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    ease: 'power2.out',
                                },
                                '-=0.4'
                            )
                            .to(
                                ddRef.current,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    ease: 'power2.out',
                                },
                                '-=0.2'
                            );
                    }, 500);

                    return () => clearTimeout(timer);
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                ScrollTrigger.getAll().forEach((trigger) => {
                    if (trigger.trigger === lineRef.current) {
                        trigger.kill();
                    }
                });
            };
        }
    }, []);

    return (
        <SelfIntroWrap>
            <Line ref={lineRef} />
            <Content>
                <TextBox>
                    <dt ref={dtRef as React.RefObject<HTMLElement>}> 작은 시작, 큰 연결 </dt>
                    <dd ref={ddRef as React.RefObject<HTMLElement>}>
                        <p>
                            프론트엔드 개발자로서, 작은 디테일이 사용자 경험을 더욱 풍부하게 만들고 자연스러운 소통을
                            이끌어낸다고 믿습니다. 화면의 섬세한 요소와 직관적인 상호작용을 통해, 더 많은 사람들이
                            편리하고 즐겁게 사용할 수 있는 서비스를 만들기 위해 끊임없이 고민하고 있습니다.
                        </p>

                        <p>
                            모든 개인은 자신만의 특별한 추억과 경험을 가지고 있습니다. 각자의 특별함이 모여 더 나은
                            세상을 만들어가는 것처럼, 저는 이러한 특별함을 기술로 연결하고 내일로 이어질 수 있는
                            서비스를 개발하고자 합니다.
                        </p>

                        <p>
                            '사용자들이 어떤 서비스를 필요로 할까?', '어떤 경험이 특별하게 다가올까?'와 같은 질문들을
                            팀원들과 함께 고민하며, 더 나은 결과를 만들어내기 위해 노력합니다.
                        </p>

                        <p>
                            사용자 피드백을 기반으로 기술을 개선하고, 테스트를 통해 부족한 부분을 보완하며, 점진적으로
                            발전하는 서비스를 만드는 것이 저의 목표입니다. 이렇게 사용자와 팀 모두가 만족할 수 있는
                            결과물을 함께 이루어가고 싶습니다.
                        </p>
                    </dd>
                </TextBox>
            </Content>
        </SelfIntroWrap>
    );
};

export default SelfIntroduction;
