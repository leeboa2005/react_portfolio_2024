import React from 'react';
import styled from 'styled-components';

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-height: 100vh;
    padding-left: 20%;
    position: relative;
    z-index: 1;
`;

const AboutMe: React.FC = () => {
    return <TextWrapper>{/* 기본 텍스트 또는 내용을 여기 추가할 수 있습니다 */}</TextWrapper>;
};

export default AboutMe;
