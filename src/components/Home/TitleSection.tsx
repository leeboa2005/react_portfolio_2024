import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { gsap } from 'gsap';

const rotateAndShake = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(-3deg);
  }
  75% {
    transform: rotate(1deg);
  }
`;

const floatUpAndDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.625rem);
  }
`;

const TitleContainer = styled.div`
    font-family: 'Exo 2', sans-serif;
    font-weight: 500;
    font-size: var(--font-title);
    line-height: 1.1;
    display: flex;
    padding: 0 6%;
    flex-direction: column;
    justify-content: center;

    @media only screen and (max-width: 1348px) {
        font-size: 5.2rem;
        padding: 0 5%;
    }

    @media only screen and (max-width: 734px) {
        font-size: 2rem;
        padding: 0 2.5%;
    }
`;

const Line = styled.div<{ alignment: 'flex-start' | 'center' | 'flex-end' }>`
    opacity: 0;
    transform: translateY(2rem);
    margin-top: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: ${({ alignment }) => alignment};

    .word {
        opacity: 0;
        transform: translateY(1.5rem);
        display: inline-block;
    }
`;

const AnimatedImage1 = styled.img`
    width: 10.37rem;
    height: auto;
    animation: ${rotateAndShake} 2.5s ease-in-out infinite;
    margin-left: 1.25rem;
    position: relative;
    top: 0.625rem;
    opacity: 0;
    transform: translateY(1.25rem);

    @media only screen and (max-width: 1348px) {
        width: 7.37rem;
    }

    @media only screen and (max-width: 734px) {
        width: 4.37rem;
    }
`;

const AnimatedImage2 = styled.img`
    width: 8.37rem;
    height: auto;
    animation: ${floatUpAndDown} 3s ease-in-out infinite;
    margin-left: 1.25rem;
    position: relative;
    top: 0.625rem;
    opacity: 0;
    transform: translateY(1.25rem);

    @media only screen and (max-width: 1348px) {
        width: 6.5rem;
    }

    @media only screen and (max-width: 734px) {
        width: 3.57rem;
    }
`;

const shake = keyframes`
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
`;

const Circle = styled.div`
    width: 0.75rem;
    height: 0.75rem;
    background-color: #57ddb2;
    border-radius: 50%;
    position: relative;
    animation: ${shake} 2s infinite alternate;
    margin: 0 0.438rem;
    opacity: 0;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-0.625rem);
    }

    @media only screen and (max-width: 1348px) {
        width: 0.55rem;
        height: 0.55rem;
    }
`;

const Tooltip = styled.div<{ position: 'right' | 'left' }>`
    position: absolute;
    background: #57ddb2;
    border-radius: 0.5rem;
    padding: 0.938rem 0.5rem;
    min-width: 9.375rem;
    box-shadow: 0 0.06rem 0.31rem rgba(0, 0, 0, 0.1);
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s;
    top: -4.5rem;
    line-height: 1.2;

    ${({ position }) => (position === 'right' ? `left: calc(100% + 3.1rem);` : `right: calc(100% - 2.5rem);`)}

    &.visible {
        visibility: visible;
        opacity: 1;
    }

    p {
        font-family: 'SUIT-Regular';
        font-size: 0.875rem;
        word-break: keep-all;
        letter-spacing: -0.02em;
        margin: 0;
    }
`;

const TitleSection = () => {
    const [hoveredCircle1, setHoveredCircle1] = useState(false);
    const [hoveredCircle2, setHoveredCircle2] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            defaults: {
                ease: 'power3.out',
                duration: 0.8,
            },
        });

        tl.fromTo(
            '.line',
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
            }
        )
            .fromTo(
                '.word',
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                },
                '-=0.5'
            )
            .fromTo(
                ['.animated-image-1', '.animated-image-2'],
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                },
                '-=0.3'
            )
            .fromTo(
                '.circle',
                {
                    opacity: 0,
                    scale: 0,
                },
                {
                    opacity: 1,
                    scale: 1,
                    stagger: 0.1,
                },
                '-=0.2'
            );

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <TitleContainer>
                <Line alignment="flex-start" className="line">
                    <div className="word">INTUITIVE UI</div>
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setHoveredCircle1(true)}
                        onMouseLeave={() => setHoveredCircle1(false)}
                    >
                        <AnimatedImage1
                            src="/home/main_notebook.png"
                            alt="노트북 이미지"
                            className="animated-image-1"
                        />
                        <Circle
                            className="circle"
                            style={{ position: 'absolute', top: '0.625rem', right: '-2.86rem' }}
                        />
                        <Tooltip className={hoveredCircle1 ? 'visible' : ''} position="right">
                            <p>안녕하세요 프론트엔드 개발자 이보아입니다. 반가워요!</p>
                        </Tooltip>
                    </div>
                </Line>

                <Line alignment="center" className="line">
                    <div className="word">USER ENGAGEMENT</div>
                </Line>

                <Line alignment="flex-end" className="line">
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setHoveredCircle2(true)}
                        onMouseLeave={() => setHoveredCircle2(false)}
                    >
                        <AnimatedImage2
                            src="/home/main_dumbbells.png"
                            alt="덤벨 이미지"
                            className="animated-image-2"
                            style={{ marginRight: '1.25rem' }}
                        />
                        <Circle className="circle" style={{ position: 'absolute', top: '0.625rem', left: '2.48rem' }} />
                        <Tooltip className={hoveredCircle2 ? 'visible' : ''} position="left">
                            <p>개발은 체력이죠 꾸준히 운동도 하려고 노력합니다.</p>
                        </Tooltip>
                    </div>
                    <div className="word">PERFORMANCE</div>
                </Line>

                <Line alignment="flex-start" className="line">
                    <div className="word">IMPROVEMENT</div>
                </Line>
            </TitleContainer>
        </div>
    );
};

export default TitleSection;
