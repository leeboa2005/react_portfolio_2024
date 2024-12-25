import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import gsap from 'gsap';
import VisuallyHidden from '../Common/VisuallyHidden';

const FooterWrap = styled.footer`
    width: 100%;
    padding: 2rem 1rem;
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

const Container = styled.div`
    max-width: var(--default-width);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    opacity: 0;
`;

const SocialContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const SocialLink = styled.a`
    position: relative;
    text-decoration: none;
    font-size: 1.1rem;
    color: black;
    display: inline-block;
    padding: 2px 0;
    opacity: 0;
    transform: translateX(-1.2rem);

    &:hover {
        text-decoration: underline;
    }

    .text-container {
        display: inline-block;
        position: relative;
        height: 1.2em;
        overflow: hidden;
    }

    .text {
        position: relative;
        display: inline-block;
        transform: translateY(0);
        transition: transform 0.55s ease;
        line-height: 1.2;
    }

    &:hover .text {
        transform: translateY(-100%);
    }

    .text::after {
        content: attr(data-hover);
        position: absolute;
        left: 0;
        top: 100%;
        line-height: 1.2;
    }
`;

const MenuLink = styled(Link)`
    position: relative;
    text-decoration: none;
    font-size: 1.1rem;
    color: black;
    display: inline-flex;
    align-items: center;
    padding: 2px 0;
    opacity: 0;
    transform: translateX(-1.2rem);

    span.emoji {
        margin-right: 0.5rem;
        line-height: 1;
    }

    .text-container {
        display: inline-block;
        position: relative;
        height: 1.2em;
        overflow: hidden;
    }

    .text {
        position: relative;
        display: inline-block;
        transform: translateY(0);
        transition: transform 0.55s ease;
        line-height: 1.2;
    }

    &:hover .text {
        transform: translateY(-100%);
    }

    .text::after {
        content: attr(data-hover);
        position: absolute;
        left: 0;
        top: 100%;
        line-height: 1.2;
    }

    @media only screen and (max-width: 734px) {
        margin-top: 0.5rem;
        font-size: 1rem;
    }
`;

const MenuContainer = styled.nav`
    display: flex;
    gap: 1rem;
    text-align: right;
    align-items: center;
`;

const FooterBottom = styled.div`
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
    opacity: 0;

    p {
        font-size: var(--font-text-small);
        color: #666;
        margin: 0;
    }

    @media only screen and (max-width: 734px) {
        margin-top: 2rem;
        justify-content: flex-start;
    }
`;

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const copyrightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 90%',
                end: 'bottom bottom',
                toggleActions: 'play none none none',
            },
        });

        timeline
            .to(lineRef.current, {
                width: '100%',
                duration: 1.5,
                ease: 'power2.out',
            })

            .to(containerRef.current, {
                opacity: 1,
                duration: 0.6,
            })

            .to(
                socialLinksRef.current,
                {
                    opacity: 1,
                    x: 0,
                    stagger: 0.3,
                    duration: 0.5,
                },
                '-=0.4'
            )

            .to(
                navLinksRef.current,
                {
                    opacity: 1,
                    x: 0,
                    stagger: 0.3,
                    duration: 0.5,
                },
                '-=0.3'
            )

            .to(
                copyrightRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.5,
                },
                '-=0.2'
            );
    }, []);

    return (
        <FooterWrap ref={footerRef}>
            <Line ref={lineRef} />
            <VisuallyHidden>푸터영역</VisuallyHidden>
            <Container ref={containerRef}>
                <SocialContainer>
                    <SocialLink
                        href="mailto:leeboa2003@naver.com"
                        aria-label="이메일 주소: leeboa2003@naver.com"
                        ref={(el) => (socialLinksRef.current[0] = el)}
                    >
                        leeboa2003@naver.com
                    </SocialLink>
                    <SocialLink
                        href="https://github.com/leeboa2005"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="깃허브 주소: leeboa2003@naver.com"
                        ref={(el) => (socialLinksRef.current[1] = el)}
                    >
                        https://github.com/leeboa2005
                    </SocialLink>
                </SocialContainer>
                <MenuContainer aria-label="각페이지 링크들">
                    <MenuLink to="/" ref={(el) => (navLinksRef.current[0] = el)} aria-label="Home으로 이동">
                        <span className="emoji">🏠</span>
                        <span className="text-container">
                            <span className="text" data-hover="Home">
                                Home
                            </span>
                        </span>
                    </MenuLink>
                    <MenuLink to="/project" ref={(el) => (navLinksRef.current[1] = el)} aria-label="Project로 이동">
                        <span className="emoji">📂</span>
                        <span className="text-container">
                            <span className="text" data-hover="Project">
                                Project
                            </span>
                        </span>
                    </MenuLink>
                    <MenuLink to="/about" ref={(el) => (navLinksRef.current[2] = el)} aria-label="About로 이동">
                        <span className="emoji">🎁</span>
                        <span className="text-container">
                            <span className="text" data-hover="About">
                                About
                            </span>
                        </span>
                    </MenuLink>
                </MenuContainer>
                <FooterBottom ref={copyrightRef}>
                    <p>©2024 LeeBoa. All Rights Reserved.</p>
                </FooterBottom>
            </Container>
        </FooterWrap>
    );
};

export default Footer;
