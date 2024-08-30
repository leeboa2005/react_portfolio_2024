import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const NavigationLayer = styled.div<{ open: boolean }>`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: ${({ open }) => (open ? 'flex' : 'none')};
    flex-direction: row;
    justify-content: space-between;
    z-index: 102;
    background-color: #56dfb4;
    transition: all 0.5s ease-in-out;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 130px 150px 60px 150px;
    width: 100%;
    height: 100%;
`;

const NavigationSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 65%;
`;

const ContactSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    width: 35%;
`;

const NavigationContainer = styled.div`
    position: relative;
`;

const HamburgerButton = styled.button<{ open: boolean }>`
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 105;
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;

    div {
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #000;
        transition: all 0.3s ease;
        &:nth-child(1) {
            transform: ${({ open }) => (open ? 'rotate(45deg)' : 'translateY(-10px)')};
        }
        &:nth-child(2) {
            opacity: ${({ open }) => (open ? 0 : 1)};
        }
        &:nth-child(3) {
            transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'translateY(10px)')};
        }
    }
`;

const AnimatedSvg = styled.img`
    position: absolute;
    width: 270px;
    height: 270px;
    top: 50%;
    left: -15px;
    transform: translateY(-50%);
    opacity: 0;
    transition: all 0.2s cubic-bezier(0.7, 0, 0.3, 1);

    @keyframes drawCircle {
        0% {
            stroke-dasharray: 157;
            stroke-dashoffset: 157;
            opacity: 0;
        }
        100% {
            stroke-dasharray: 157;
            stroke-dashoffset: 0;
            opacity: 1;
        }
    }
`;

const NavLinks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    opacity: 1;
    transition: all 0.5s ease-in-out;
`;

const NavLink = styled(Link)`
    color: #0d0f0f;
    font-size: 120px;
    font-weight: 600;
    text-decoration: none;
    margin: 20px 0;
    position: relative;
    transition: all 0.2s cubic-bezier(0.7, 0, 0.3, 1);

    &:hover > ${AnimatedSvg} {
        opacity: 1;
        animation: drawCircle 0.8s ease-in-out forwards;
    }
`;
const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #0d0f0f;
    padding: 16px 20px;
    border-radius: 19px;

    &:hover img {
        filter: grayscale(0%);
    }
`;

const ContactLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #000;
    margin-bottom: 10px;

    p {
        margin-right: 25px;
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        font-size: 23px;
        font-weight: bold;
        color: #f2f2f2;
    }

    img {
        width: 280px;
        height: auto;
        object-fit: cover;
        border-radius: 10px;
        filter: grayscale(100%);
        transition: filter 0.3s ease;
    }
`;

const ContactInfo = styled.div`
    text-align: right;
    color: #0d0f0f;
    width: 370px;
    height: 200px;
    border: 1px solid #0d0f0f;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    position: relative;

    &:hover span {
        animation: rotateLogo 5s linear infinite;
    }

    span {
        position: absolute;
        bottom: 20px;
        left: 15px;
        width: 40px;
        height: 40px;

        img {
            width: 100%;
        }
    }

    @keyframes rotateLogo {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    div {
        position: absolute;
        top: 20px;
        left: 20px;
        margin-right: 10px;
        width: fit-content;

        p {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            font-size: 23px;
            font-weight: 600;
            color: #0d0f0f;
        }
    }

    ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        li {
            strong {
                font-size: 20px;
                font-weight: 600;
                display: block;
                margin-bottom: 8px;
            }
            p {
                font-size: 18px;
            }
        }
    }
`;

const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            <HamburgerButton open={isOpen} onClick={toggleMenu}>
                <div />
                <div />
                <div />
            </HamburgerButton>
            <NavigationLayer open={isOpen}>
                <ContentContainer>
                    <NavigationSection>
                        <NavigationContainer>
                            <NavLinks>
                                <NavLink to="/" className="nav-link">
                                    Home
                                    <AnimatedSvg
                                        src="/src/assets/svg/straight.svg"
                                        className="draw"
                                        alt="밑줄 호버효과"
                                    />
                                </NavLink>
                                <NavLink to="/project" className="nav-link">
                                    Project
                                    <AnimatedSvg
                                        src="/src/assets/svg/circle.svg"
                                        className="draw"
                                        alt="동그라미 호버효과"
                                    />
                                </NavLink>
                                <NavLink to="/work" className="nav-link">
                                    Work
                                    <AnimatedSvg
                                        src="/src/assets/svg/wave.svg"
                                        className="draw"
                                        alt="웨이브 호버효과"
                                    />
                                </NavLink>
                            </NavLinks>
                        </NavigationContainer>
                    </NavigationSection>
                    <ContactSection>
                        <ContactContainer>
                            <ContactLink to="/about">
                                <p>ABOUT ME</p>
                                <img src="/about_nav.png" alt="About 페이지 대표 이미지" />
                            </ContactLink>
                        </ContactContainer>
                        <ContactInfo>
                            <span>
                                <img src="/black_logo.png" alt="네비게이션 작은 로고"></img>
                            </span>
                            <div>
                                <p>CONTACT</p>
                            </div>
                            <ul>
                                <li>
                                    <strong>EMAIL</strong>
                                    <p>leeboa2003@naver.com</p>
                                </li>
                                <li>
                                    <strong>BLOG</strong>
                                    <Link to="https://velog.io/@leeboa2003/" aria-label="개발 velog 구경하기">
                                        velog.io/@leeboa2003
                                    </Link>
                                </li>
                            </ul>
                        </ContactInfo>
                    </ContactSection>
                </ContentContainer>
            </NavigationLayer>
        </>
    );
};

export default Navigation;
