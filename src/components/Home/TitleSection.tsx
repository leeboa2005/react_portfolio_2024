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
    transform: translateY(-10px);
  }
`;

const TitleContainer = styled.div`
    font-family: 'Exo 2', sans-serif;
    font-weight: 500;
    font-size: 8vw;
    line-height: 1.1;
    display: flex;
    padding: 0 3vw;
    flex-direction: column;
    justify-content: center;
`;

const Line = styled.div<{ alignment: 'flex-start' | 'center' | 'flex-end' }>`
    opacity: 0;
    transform: translateY(30px);
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: ${({ alignment }) => alignment};

    .word {
        opacity: 0;
        transform: translateY(20px);
        display: inline-block;
    }
`;

const AnimatedImage1 = styled.img`
    width: 8.6vw;
    height: auto;
    animation: ${rotateAndShake} 2.5s ease-in-out infinite;
    margin-left: 20px;
    position: relative;
    top: 10px;
    opacity: 0;
    transform: translateY(20px);
`;

const AnimatedImage2 = styled.img`
    width: 7.2vw;
    height: auto;
    animation: ${floatUpAndDown} 3s ease-in-out infinite;
    margin-left: 20px;
    position: relative;
    top: 10px;
    opacity: 0;
    transform: translateY(20px);
`;

const shake = keyframes`
    0% {
        transform: scale(1) translateY(0);
    }
    10% {
        transform: scale(.8, 1.2) translateY(-70%);
    }
    20% {
        transform: scale(1.2, .8) translateY(0);
    }
    30% {
        transform: scale(.95, 1.05) translateY(-30%);
    }
    40% {
        transform: scale(1) translateY(0);
    }
    100% {
        transform: scale(1) translateY(0);
    }
`;

const Circle = styled.div`
    width: 12px;
    height: 12px;
    background-color: #57ddb2;
    border-radius: 50%;
    position: relative;
    animation: ${shake} 2s infinite alternate;
    margin: 0 7px;
    opacity: 0;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-10px);
    }
`;

const Tooltip = styled.div<{ position: 'right' | 'left' }>`
    position: absolute;
    background: #57ddb2;
    border-radius: 8px;
    padding: 15px 8px;
    min-width: 150px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s;
    top: -10px;
    line-height: 1.2;

    ${({ position }) => (position === 'right' ? `left: 120%;` : `right: 85%;`)}

    &.visible {
        visibility: visible;
        opacity: 1;
    }

    p {
        font-family: 'SUIT-Regular';
        font-size: 14px;
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
                        <Circle className="circle" style={{ position: 'absolute', top: '10px', right: '-25px' }} />
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
                            style={{ marginRight: '20px' }}
                        />
                        <Circle className="circle" style={{ position: 'absolute', top: '10px', left: '35px' }} />
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
