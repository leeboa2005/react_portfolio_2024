import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const OverviewContainer = styled.section`
    width: var(--default-width);
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const TitleContainer = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 5rem;
`;

const Line = styled.div`
    position: absolute;
    top: -10px;
    left: 0;
    height: 1px;
    background-color: black;
    width: 0%;
`;

const Title = styled.h2`
    font-size: var(--font-title);
    font-family: var(--font-default-eng);
    opacity: 0;
    z-index: 1;
    position: relative;
`;

const ContentWrap = styled.div`
    padding-bottom: 6.5rem;
`;

const LinkWrap = styled.ul`
    width: calc(36rem * 2 + 1.6rem);
    margin: 0 auto;
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3.6rem 1.6rem;

    @media only screen and (max-width: 1348px) {
        width: calc(21.3rem * 2 + 1rem);
    }

    @media only screen and (max-width: 734px) {
        width: 100%;
        grid-template-columns: repeat(1, 1fr);
        gap: 1.6rem 0;
    }
`;

const RoundButton = styled.div`
    position: absolute;
    bottom: 0;
    right: -2.5rem;
    width: 3.3rem;
    height: 3.3rem;
    background-color: #e6e6e6;
    border: 1px solid #ddd;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    transform: rotate(-50deg);
    transition: transform 0.5s ease-out, background-color 0.3s ease;

    img {
        width: 2.7rem;
        height: 2.7rem;
    }

    @media only screen and (max-width: 1348px) {
        right: -2rem;
        width: 2rem;
        height: 2rem;
    }

    img {
        width: 1.6rem;
        height: 1.6rem;
    }
`;

const LinkBox = styled.li`
    width: 36rem;
    height: 21.46rem;
    padding: 2.5rem 2.5rem 0;
    position: relative;
    background: #f2f2f2 url('/home/overview_box_shape.webp') no-repeat center center;
    background-size: cover;
    border-radius: var(--default-radius);
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: background-color 0.3s ease;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
    }

    &:hover:first-child::after {
        background-image: url('/home/overview_box_shape_hover1.webp');
        opacity: 1;
    }

    &:hover:nth-child(2)::after {
        background-image: url('/home/overview_box_shape_hover2.webp');
        opacity: 1;
    }

    &:hover ${RoundButton} {
        background-color: ${(props) => props.color};
        transform: rotate(0deg);
    }

    @media only screen and (max-width: 1348px) {
        width: 21.3rem;
        height: 12.64rem;
        padding: 2rem 2rem 0;
    }

    @media only screen and (max-width: 734px) {
        margin: 0 auto;
    }
`;

const StyledLink = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: black;
    position: relative;
    z-index: 2;

    h3 {
        font-size: 3.2rem;
        font-family: var(--font-default-eng);
        position: relative;
        width: fit-content;
        z-index: 3;

        @media only screen and (max-width: 1348px) {
            font-size: 2.4rem;
        }

        @media only screen and (max-width: 734px) {
            font-size: 1.9rem;
        }

        &::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: black;
            transition: width 0.3s ease-out;
        }
    }

    &:hover h3::after {
        width: 100%;
    }
`;

const SpriteContainer = styled.div`
    position: relative;
    z-index: 2;
    display: inline-block;
    flex: 0 0 14.8125rem;
    height: 15rem;
    background-image: url('/sprite.webp');
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: calc(14.8125rem * 7) 100%;
    animation: sprite-frames 1.4s steps(7) infinite;

    @keyframes sprite-frames {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: -103.6875rem 0;
        }
    }

    @media only screen and (max-width: 734px) {
        width: 14.8125rem;
        height: 15rem;
        margin-bottom: 2rem;
    }
`;

const TextWrap = styled.div`
    margin: 2rem auto 4rem;
    width: calc(36rem * 2 + 1.6rem);
    display: flex;
    align-items: center;
    opacity: 0;
    transform: translateY(30px);

    span {
        word-break: keep-all;
        line-height: 1.4;
    }
    @media only screen and (max-width: 1348px) {
        width: calc(21.3rem * 2 + 1rem);
    }

    @media only screen and (max-width: 734px) {
        width: 100%;
        margin: 0 auto 3rem;
        flex-direction: column;
        text-align: center;
    }
`;

const Tooltip = styled.div`
    position: absolute;
    top: -2.5rem;
    left: 50%;
    width: 11.375rem;
    text-align: left;
    transform: translateX(-50%);
    background: var(--main-color-green);
    border-radius: var(--default-radius-small);
    padding: 0.5rem 0.8rem;
    min-width: 10rem;
    box-shadow: 0 0.06rem 0.31rem rgba(0, 0, 0, 0.1);
    font-family: 'SUIT-Regular';
    font-size: 0.875rem;
    line-height: 1.3;
    visibility: hidden;
    opacity: 0;
    word-break: keep-all;
    transition: opacity 0.3s ease, visibility 0.3s ease;

    ${SpriteContainer}:hover & {
        visibility: visible;
        opacity: 1;
    }
`;

const Circle = styled.div`
    width: 0.75rem;
    height: 0.75rem;
    background: var(--main-color-green);
    border-radius: 50%;
    position: absolute;
    top: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    animation: shake 2s infinite alternate;

    @keyframes shake {
        0% {
            transform: scale(1) translateY(0);
        }
        10% {
            transform: scale(0.8, 1.2) translateY(-0.875rem);
        }
        20% {
            transform: scale(1.2, 0.8) translateY(0);
        }
        30% {
            transform: scale(0.95, 1.05) translateY(-0.375rem);
        }
        40% {
            transform: scale(1) translateY(0);
        }
        100% {
            transform: scale(1) translateY(0);
        }
    }
`;

const OverviewSection = () => {
    const lineRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const projectRef = useRef<HTMLLIElement>(null);
    const aboutRef = useRef<HTMLLIElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: lineRef.current,
                start: 'top center',
                end: 'bottom center',
                toggleActions: 'play none none none',
            },
        });

        timeline.to(lineRef.current, {
            width: '100%',
            duration: 1,
            ease: 'power2.out',
        });

        timeline.to(
            titleRef.current,
            {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
            },
            '-=0.5'
        );

        timeline.to(
            projectRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
            },
            '+=0.3'
        );

        timeline.to(
            aboutRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
            },
            '-=0.5'
        );
        timeline.to(
            textRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
            },
            '+=0.3'
        );
    }, []);

    return (
        <OverviewContainer>
            <TitleContainer>
                <Line ref={lineRef} />
                <Title ref={titleRef}>OVERVIEW</Title>
            </TitleContainer>
            <ContentWrap>
                <LinkWrap>
                    <LinkBox ref={projectRef} color="#f989b3">
                        <StyledLink to="/project">
                            <h3>Project</h3>
                            <RoundButton>
                                <img src="/src/assets/svg/arrow.svg" alt="Project 페이지로 이동" />
                            </RoundButton>
                        </StyledLink>
                    </LinkBox>
                    <LinkBox ref={aboutRef} color="#56dfb4">
                        <StyledLink to="/about">
                            <h3>About</h3>
                            <RoundButton>
                                <img src="/src/assets/svg/arrow.svg" alt="About 페이지로 이동" />
                            </RoundButton>
                        </StyledLink>
                    </LinkBox>
                </LinkWrap>
                <TextWrap ref={textRef}>
                    <SpriteContainer>
                        <Circle />
                        <Tooltip>안녕하세요 제 프로젝트가 궁금하신가요?</Tooltip>
                    </SpriteContainer>
                    <span>
                        Project 페이지에는 개인 및 팀 프로젝트와 직무에서 진행한 프로젝트의 결과가 담겨 있습니다. 이
                        과정에서 고민했던 점, 해결 방법, 관련 공부 기록, 그리고 구현한 기능들을 통해 저의 기술 스택과
                        문제 해결 능력을 깊이 있게 확인하실 수 있습니다. About 페이지에서는 제 경험과 가치관, 그리고
                        앞으로 프론트엔드 개발자로서 나아가고 싶은 방향을 간략히 소개하고 있습니다.
                    </span>
                </TextWrap>
            </ContentWrap>
        </OverviewContainer>
    );
};

export default OverviewSection;
