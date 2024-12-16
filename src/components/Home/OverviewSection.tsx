import React from 'react';
import styled from 'styled-components';

const OverviewContainer = styled.section`
    width: var(--default-width);
    margin: 0 auto;
    position: relative;
`;

const Title = styled.h1`
    font-size: var(--font-title);
    font-family: 'Exo 2', sans-serif;
    position: relative;
    z-index: 1;
`;

const ContentWrap = styled.div`
    width: 100%;
    height: 800px;
`;

const OverviewSection = () => {
    return (
        <OverviewContainer>
            <Title>OVERVIEW</Title>
            <ContentWrap></ContentWrap>
        </OverviewContainer>
    );
};

export default OverviewSection;
