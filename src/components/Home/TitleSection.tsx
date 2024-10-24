import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const rotateAnimation = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  20% {
    transform: translate(5px, -5px) rotate(5deg);
  }
  40% {
    transform: translate(-5px, 5px) rotate(-5deg);
  }
  60% {
    transform: translate(5px, 5px) rotate(5deg);
  }
  80% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TitleContainer = styled.div`
    font-family: 'Exo 2', sans-serif;
    font-weight: 400;
    font-size: 7.5vw;
    line-height: 1.1;
    display: flex;
    padding: 0 3vw;
    flex-direction: column;
    justify-content: center;
`;

const Line = styled.div<{ alignment: 'flex-start' | 'center' | 'flex-end' }>`
    opacity: 0;
    animation: ${fadeInUp} 0.5s ease-out forwards;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: ${({ alignment }) => alignment};

    &.visible {
        opacity: 1;
        animation: none;
    }
`;

const AnimatedImage = styled.img`
    width: 8.2vw;
    height: auto;
    animation: ${rotateAnimation} 2s ease-in-out infinite;
    margin-left: 20px;
    position: relative;
    top: 10px;
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
`;

const Tooltip = styled.div<{ position: 'right' | 'left' }>`
    position: absolute;
    background: #57ddb2;
    border-radius: 8px;
    padding: 15px 8px;
    min-width: 13vw;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s;
    top: -10px;

    ${({ position }) => (position === 'right' ? `left: 120%;` : `right: 85%;`)}

    &.visible {
        visibility: visible;
        opacity: 1;
    }

    p {
        font-family: 'SUIT-Regular';
        font-size: 1rem;
        line-height: 1.2;
        word-break: keep-all;
    }
`;

const TitleSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCircle1, setHoveredCircle1] = useState(false);
    const [hoveredCircle2, setHoveredCircle2] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <TitleContainer>
                <Line alignment="flex-start" className={isVisible ? 'visible' : ''}>
                    <div className="word">INTUITIVE UI</div>
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setHoveredCircle1(true)}
                        onMouseLeave={() => setHoveredCircle1(false)}
                    >
                        <AnimatedImage src="/home/main_notebook.png" alt="노트북 이미지" />
                        <Circle style={{ position: 'absolute', top: '10px', right: '-25px' }} />
                        <Tooltip className={hoveredCircle1 ? 'visible' : ''} position="right">
                            <p>안녕하세요 프론트엔드 이보아입니다. 반가워요!</p>
                        </Tooltip>
                    </div>
                </Line>

                <Line alignment="center" className={isVisible ? 'visible' : ''}>
                    <div className="word">USER ENGAGEMENT</div>
                </Line>

                <Line alignment="flex-end" className={isVisible ? 'visible' : ''}>
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setHoveredCircle2(true)}
                        onMouseLeave={() => setHoveredCircle2(false)}
                    >
                        <AnimatedImage
                            src="/home/main_dumbbells.png"
                            alt="덤벨 이미지"
                            style={{ marginRight: '20px' }}
                        />
                        <Circle />
                        <Tooltip className={hoveredCircle2 ? 'visible' : ''} position="left">
                            <p>개발은 체력이죠 꾸준히 운동도 하려고 노력합니다.</p>
                        </Tooltip>
                    </div>
                    <div className="word">PERFORMANCE</div>
                </Line>

                <Line alignment="flex-start" className={isVisible ? 'visible' : ''}>
                    <div className="word">IMPROVEMENT</div>
                </Line>
            </TitleContainer>
        </div>
    );
};

export default TitleSection;
