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
    margin-bottom: 50px;
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
    font-family: 'Exo 2', sans-serif;
    opacity: 0;
    z-index: 1;
    position: relative;
`;

const ContentWrap = styled.div`
    width: 100%;
    height: 800px;
`;

const LinkWrap = styled.ul`
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3.6rem 1.6rem;

    @media only screen and (max-width: 734px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const RoundButton = styled.div`
    position: absolute;
    bottom: 54px;
    right: 3px;
    width: 70px;
    height: 70px;
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
        width: 36px;
        height: 36px;
    }
`;

const LinkBox = styled.li`
    height: 25rem;
    position: relative;
    background: #ffffff;
    border-radius: 40px;
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => props.color};
    }

    &:hover ${RoundButton} {
        background-color: ${(props) => props.color};
        transform: rotate(0deg);
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100px;
        height: 100px;
        background: #f2f2f2;
        border-top-left-radius: 70%;
        z-index: 1;
    }
`;

const StyledLink = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: black;
    position: relative;

    h3 {
        font-size: var(--font-sub-title);
        font-family: var(--font-default-eng);
        margin: 3rem;
        position: relative;
        width: fit-content;

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

const TextWrap = styled.div`
    margin: 4rem auto 0;
    width: 65%;
    display: flex;

    span {
        word-break: keep-all;
        line-height: 1.4;
    }
`;

const OverviewSection = () => {
    const lineRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const projectRef = useRef<HTMLLIElement>(null);
    const aboutRef = useRef<HTMLLIElement>(null);

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
                <TextWrap>
                    <span>
                        Project 섹션에서는 제가 작업한 다양한 프로젝트와 결과물을 확인할 수 있습니다. 개발 과정에서
                        고민했던 점과 해결 방법과 구현된 기능들을 통해 저의 기술 스택과 문제 해결 능력을 살펴보실 수
                        있습니다. About 섹션에서는 저의 경험과 가치관, 그리고 프론트엔드 개발자로서의 방향성을 간단히
                        소개하고 있습니다.
                    </span>
                </TextWrap>
            </ContentWrap>
        </OverviewContainer>
    );
};

export default OverviewSection;
