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
    return <TextWrapper></TextWrapper>;
};

export default AboutMe;
