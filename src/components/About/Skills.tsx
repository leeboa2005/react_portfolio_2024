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
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(20px);
`;

const SkillCategory = styled.div<{ isFirst: boolean }>`
    display: flex;
    align-items: flex-start;
    margin-bottom: 3rem;
    border-top: ${(props) => (props.isFirst ? 'none' : '1px solid #ccc')};
    padding-top: ${(props) => (props.isFirst ? '0' : '1rem')};
    opacity: 0;
    transform: translateY(20px);

    @media only screen and (max-width: 734px) {
        flex-direction: column;
    }
`;

const Title = styled.h3`
    font-size: var(--font-text);
    width: 30%;
    margin-right: 2rem;
    line-height: 1.3;
    word-break: keep-all;

    @media only screen and (max-width: 734px) {
        width: 100%;
        margin-right: 0;
        margin-bottom: 1rem;
        font-weight: var(--font-weight-bold);
    }
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 60%;

    @media only screen and (max-width: 734px) {
        width: 100%;
    }
`;

const ListItem = styled.li`
    font-size: var(--font-text);
    line-height: 1.8;
    border-bottom: 1px solid #ccc;
    padding: 0.5rem 0;

    &:last-child {
        border-bottom: none;
    }
`;

const Skills: React.FC = () => {
    const lineRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const categoryRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
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
        }).to(
            titleRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
            },
            '-=0.5'
        );

        categoryRefs.current.forEach((category, index) => {
            tl.to(
                category,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                },
                `+=${index * 0.1}`
            );
        });
    }, []);

    return (
        <SkillsWrap>
            <Line ref={lineRef} />
            <MainTitle ref={titleRef}>나의 기술들</MainTitle>
            <SkillCategory isFirst={true} ref={(el) => el && (categoryRefs.current[0] = el)}>
                <Title>(A) 개발 기술</Title>
                <List>
                    <ListItem>JavaScript</ListItem>
                    <ListItem>TypeScript</ListItem>
                    <ListItem>React</ListItem>
                    <ListItem>Next.js</ListItem>
                </List>
            </SkillCategory>
            <SkillCategory isFirst={false} ref={(el) => el && (categoryRefs.current[1] = el)}>
                <Title>(B) 스타일링 및 마크업</Title>
                <List>
                    <ListItem>HTML5</ListItem>
                    <ListItem>CSS3</ListItem>
                    <ListItem>Tailwind CSS</ListItem>
                    <ListItem>Bootstrap</ListItem>
                </List>
            </SkillCategory>
            <SkillCategory isFirst={false} ref={(el) => el && (categoryRefs.current[2] = el)}>
                <Title>(C) 형상 관리</Title>
                <List>
                    <ListItem>Git</ListItem>
                    <ListItem>GitHub</ListItem>
                    <ListItem>Svn</ListItem>
                </List>
            </SkillCategory>
            <SkillCategory isFirst={false} ref={(el) => el && (categoryRefs.current[3] = el)}>
                <Title>(D) 서비스형 백엔드 및 배포</Title>
                <List>
                    <ListItem>Firebase</ListItem>
                    <ListItem>Supabase</ListItem>
                    <ListItem>Vercel</ListItem>
                </List>
            </SkillCategory>
        </SkillsWrap>
    );
};

export default Skills;
